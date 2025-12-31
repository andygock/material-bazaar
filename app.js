(() => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const fmt = {
    usd: (v) => {
      if (!isFinite(v)) return "—";
      if (v >= 1000) return v.toFixed(0);
      if (v >= 100) return v.toFixed(1);
      if (v >= 10) return v.toFixed(2);
      return v.toFixed(3);
    },
    gpa: (v) => {
      if (!isFinite(v)) return "—";
      if (v >= 100) return v.toFixed(0);
      if (v >= 10) return v.toFixed(1);
      return v.toFixed(2);
    },
    rho: (v) => {
      if (!isFinite(v)) return "—";
      return v.toFixed(0);
    },
  };

  const MATERIALS = window.MATERIALS || [];

  const state = {
    q: "",
    mode: "unit",
    minE: 2,
    maxRho: 21000,
    budget: 50,
    bias: 0.55,
    shipKg: 0,
    shipM3: 0,
    cats: new Set(),
    hoverId: null,
    highlightId: null,
    zoomT: d3.zoomIdentity,
  };

  const els = {
    q: document.getElementById("q"),
    mode: document.getElementById("mode"),
    resetView: document.getElementById("resetView"),
    minE: document.getElementById("minE"),
    maxRho: document.getElementById("maxRho"),
    budget: document.getElementById("budget"),
    bias: document.getElementById("bias"),
    shipKg: document.getElementById("shipKg"),
    shipM3: document.getElementById("shipM3"),
    minEVal: document.getElementById("minEVal"),
    maxRhoVal: document.getElementById("maxRhoVal"),
    budgetVal: document.getElementById("budgetVal"),
    biasVal: document.getElementById("biasVal"),
    shipKgVal: document.getElementById("shipKgVal"),
    shipM3Val: document.getElementById("shipM3Val"),
    catBox: document.getElementById("catBox"),
    tip: document.getElementById("tip"),
    bestList: document.getElementById("bestList"),
    canvasHost: document.getElementById("canvasHost"),
  };

  const categories = Array.from(new Set(MATERIALS.map((d) => d.cat))).sort(
    (a, b) => a.localeCompare(b)
  );
  categories.forEach((c) => state.cats.add(c));

  const colourByCat = d3
    .scaleOrdinal()
    .domain(categories)
    .range(
      d3.quantize((t) => d3.interpolateSpectral(1 - t), categories.length)
    );

  function landedUsdKg(d) {
    const volumetric = state.shipM3 / Math.max(1, d.rho);
    return d.usdkg + state.shipKg + volumetric;
  }

  function yValue(d) {
    if (state.mode === "unit") return d.usdkg;
    if (state.mode === "landed") return landedUsdKg(d);
    const c = landedUsdKg(d);
    const E = Math.max(1e-6, d.E);
    return c / E;
  }

  function yLabel() {
    if (state.mode === "unit") return "Unit cost (USD/kg)";
    if (state.mode === "landed") return "Landed cost (USD/kg)";
    return "Cost per stiffness (USD per GPa·kg)";
  }

  function isVisible(d) {
    if (!state.cats.has(d.cat)) return false;
    if (state.q && !d.name.toLowerCase().includes(state.q.toLowerCase()))
      return false;
    return true;
  }

  function isFeasible(d) {
    if (d.rho > state.maxRho) return false;
    if (d.E < state.minE) return false;
    if (yValue(d) > state.budget) return false;
    return true;
  }

  function score(d) {
    const E = Math.max(1e-6, d.E);
    const y = Math.max(1e-6, yValue(d));
    const stiff = Math.log10(1 + E);
    const cheap = Math.log10(1 + 1 / y);
    const b = clamp(state.bias, 0, 1);
    return b * stiff + (1 - b) * cheap;
  }

  function paretoFront(points) {
    const pts = points
      .slice()
      .sort((a, b) => a.rho - b.rho || yValue(a) - yValue(b));

    const front = [];
    let bestY = Infinity;
    for (const p of pts) {
      const y = yValue(p);
      if (y < bestY) {
        front.push(p);
        bestY = y;
      }
    }
    return front;
  }

  function buildCategoryUI() {
    els.catBox.innerHTML = "";
    const counts = d3.rollup(
      MATERIALS,
      (v) => v.length,
      (d) => d.cat
    );
    categories.forEach((c) => {
      const id = "cat_" + c.replace(/\W+/g, "_").toLowerCase();
      const lab = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = id;
      cb.checked = state.cats.has(c);
      cb.addEventListener("change", () => {
        if (cb.checked) state.cats.add(c);
        else state.cats.delete(c);
        requestRedraw();
        renderBestList();
      });
      const dot = document.createElement("span");
      dot.className = "catColor";
      dot.style.backgroundColor = colourByCat(c);
      const span = document.createElement("span");
      span.textContent = c;
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = String(counts.get(c) || 0);
      lab.appendChild(cb);
      lab.appendChild(dot);
      lab.appendChild(span);
      lab.appendChild(b);
      els.catBox.appendChild(lab);
    });
  }

  function syncUIBadges() {
    els.minEVal.textContent = String(state.minE);
    els.maxRhoVal.textContent = fmt.rho(state.maxRho);
    els.budgetVal.textContent = fmt.usd(state.budget);
    els.biasVal.textContent = String(Math.round(state.bias * 100));
    els.shipKgVal.textContent = fmt.usd(state.shipKg);
    els.shipM3Val.textContent = String(Math.round(state.shipM3));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => {
      switch (c) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return c;
      }
    });
  }

  function showTip(px, py, d) {
    const y = yValue(d);
    const unit = d.usdkg;
    const landed = landedUsdKg(d);
    const perStiff = landed / Math.max(1e-6, d.E);
    const ok = isFeasible(d);

    els.tip.style.display = "block";
    els.tip.innerHTML = `
            <div class="t">${escapeHtml(d.name)}</div>
            <div class="mono">Family: ${escapeHtml(d.cat)}</div>
            <div class="mono">Density: ${fmt.rho(d.rho)} kg/m³</div>
            <div class="mono">Young’s modulus: ${fmt.gpa(d.E)} GPa</div>
            <div class="mono">Unit: ${fmt.usd(unit)} USD/kg</div>
            <div class="mono">Landed: ${fmt.usd(landed)} USD/kg</div>
            <div class="mono">Landed per stiffness: ${fmt.usd(
              perStiff
            )} USD/(GPa·kg)</div>
            <div class="mono">${
              ok
                ? "Feasible under current recipe"
                : "Not feasible under current recipe"
            }</div>
            ${
              d.note
                ? `<div class="divider"></div><div class="mono">${escapeHtml(
                    d.note
                  )}</div>`
                : ""
            }
          `;

    const hostRect = els.canvasHost.getBoundingClientRect();
    const tipRect = els.tip.getBoundingClientRect();
    const left = clamp(px + 12, 8, hostRect.width - tipRect.width - 8);
    const top = clamp(py + 12, 8, hostRect.height - tipRect.height - 8);

    els.tip.style.left = left + "px";
    els.tip.style.top = top + "px";
  }

  function hideTip() {
    els.tip.style.display = "none";
  }

  function renderBestList() {
    const visible = MATERIALS.filter(isVisible);
    const feasible = visible.filter(isFeasible);
    const scored = feasible
      .map((d) => ({ d, s: score(d) }))
      .sort((a, b) => b.s - a.s);

    const picks = [];
    const capPerCat = 3;
    const countByCat = new Map();

    for (const it of scored) {
      const c = it.d.cat;
      const n = countByCat.get(c) || 0;
      if (n >= capPerCat) continue;
      picks.push(it);
      countByCat.set(c, n + 1);
      if (picks.length >= 10) break;
    }

    els.bestList.innerHTML = "";
    if (picks.length === 0) {
      const empty = document.createElement("div");
      empty.className = "footerNote";
      empty.textContent =
        "No materials satisfy the current recipe. Relax budget, density, or stiffness.";
      els.bestList.appendChild(empty);
      return;
    }

    const table = document.createElement("table");
    table.className = "bestPicksTable";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Material", "Score", "ρ (kg/m³)", "E (GPa)", "Cost (USD/kg)"].forEach(
      (text) => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
      }
    );
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (const { d, s } of picks) {
      const row = document.createElement("tr");

      // Material column with color circle
      const matCell = document.createElement("td");
      const colorCircle = document.createElement("span");
      colorCircle.className = "familyColor";
      colorCircle.style.backgroundColor = colourByCat(d.cat);
      const nameSpan = document.createElement("span");
      nameSpan.textContent = d.name;
      matCell.appendChild(colorCircle);
      matCell.appendChild(nameSpan);
      row.appendChild(matCell);

      // Score
      const scoreCell = document.createElement("td");
      scoreCell.textContent = s.toFixed(3);
      row.appendChild(scoreCell);

      // Density
      const rhoCell = document.createElement("td");
      rhoCell.textContent = fmt.rho(d.rho);
      row.appendChild(rhoCell);

      // E
      const eCell = document.createElement("td");
      eCell.textContent = fmt.gpa(d.E);
      row.appendChild(eCell);

      // Cost
      const costCell = document.createElement("td");
      costCell.textContent = fmt.usd(yValue(d));
      row.appendChild(costCell);

      row.addEventListener("pointerenter", () => {
        state.highlightId = d.id;
        requestRedraw();
      });
      row.addEventListener("pointerleave", () => {
        if (state.highlightId === d.id) {
          state.highlightId = null;
          requestRedraw();
        }
      });

      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    els.bestList.appendChild(table);
  }

  buildCategoryUI();
  syncUIBadges();

  // Canvas chart geometry
  const margin = { top: 18, right: 18, bottom: 44, left: 60 };

  // Base scales; zoom creates derived scales via transform.rescaleX/Y.
  let x0 = null;
  let y0 = null;
  let size0 = null;

  // Render state
  let plotW = 0;
  let plotH = 0;
  let hostW = 0;
  let hostH = 0;

  // D3 zoom behaviour (applied to the canvas element)
  const zoom = d3
    .zoom()
    .scaleExtent([0.8, 25])
    .filter((ev) => {
      // Allow wheel zoom, left drag pan. Avoid zoom on right-click.
      if (ev.type === "mousedown") return ev.button === 0;
      return !ev.ctrlKey || ev.type === "wheel";
    })
    .on("zoom", (ev) => {
      state.zoomT = ev.transform;
      requestRedraw();
    });

  // p5 handles the canvas creation and draw loop.
  let needsRedraw = true;
  const requestRedraw = () => {
    needsRedraw = true;
  };

  function computeScalesForVisible() {
    const visible = MATERIALS.filter(isVisible);
    const yVals = visible.map(yValue).filter((v) => isFinite(v) && v > 0);
    const xVals = visible.map((d) => d.rho).filter((v) => isFinite(v) && v > 0);
    const eVals = visible.map((d) => d.E).filter((v) => isFinite(v) && v > 0);

    const xMin = Math.max(10, d3.min(xVals) || 10);
    const xMax = Math.max(xMin * 1.2, d3.max(xVals) || 20000);
    const yMin = Math.max(1e-6, d3.min(yVals) || 0.001);
    const yMax = Math.max(yMin * 10, d3.max(yVals) || 1000);
    const eMin = Math.max(1e-6, d3.min(eVals) || 0.01);
    const eMax = Math.max(eMin * 10, d3.max(eVals) || 500);

    x0 = d3.scaleLog().domain([xMin, xMax]).range([0, plotW]);
    y0 = d3.scaleLog().domain([yMin, yMax]).range([plotH, 0]);
    size0 = d3.scaleSqrt().domain([eMin, eMax]).range([2.2, 10]);
  }

  function resetView() {
    state.zoomT = d3.zoomIdentity;
    // Programmatically update zoom state
    const canvas = document.querySelector("#canvasHost canvas");
    if (canvas) d3.select(canvas).call(zoom.transform, d3.zoomIdentity);
    requestRedraw();
  }

  // Controls wiring
  els.q.addEventListener("input", () => {
    state.q = els.q.value.trim();
    computeScalesForVisible();
    requestRedraw();
    renderBestList();
  });

  els.mode.addEventListener("change", () => {
    state.mode = els.mode.value;
    computeScalesForVisible();
    requestRedraw();
    renderBestList();
  });

  els.minE.addEventListener("input", () => {
    state.minE = Number(els.minE.value);
    syncUIBadges();
    requestRedraw();
    renderBestList();
  });

  els.maxRho.addEventListener("input", () => {
    state.maxRho = Number(els.maxRho.value);
    syncUIBadges();
    requestRedraw();
    renderBestList();
  });

  els.budget.addEventListener("input", () => {
    state.budget = Number(els.budget.value);
    syncUIBadges();
    requestRedraw();
    renderBestList();
  });

  els.bias.addEventListener("input", () => {
    state.bias = Number(els.bias.value) / 100;
    syncUIBadges();
    requestRedraw();
    renderBestList();
  });

  els.shipKg.addEventListener("input", () => {
    state.shipKg = Number(els.shipKg.value);
    syncUIBadges();
    computeScalesForVisible();
    requestRedraw();
    renderBestList();
  });

  els.shipM3.addEventListener("input", () => {
    state.shipM3 = Number(els.shipM3.value);
    syncUIBadges();
    computeScalesForVisible();
    requestRedraw();
    renderBestList();
  });

  els.resetView.addEventListener("click", () => {
    hideTip();
    resetView();
  });

  // p5 sketch
  const sketch = (p) => {
    let canvas = null;

    function resizeToHost() {
      const r = els.canvasHost.getBoundingClientRect();
      hostW = Math.max(10, Math.floor(r.width));
      hostH = Math.max(10, Math.floor(r.height));

      plotW = Math.max(10, hostW - margin.left - margin.right);
      plotH = Math.max(10, hostH - margin.top - margin.bottom);

      p.resizeCanvas(hostW, hostH);
      computeScalesForVisible();
      requestRedraw();
    }

    function toPlotXY(screenX, screenY) {
      // Convert screen to plot coords (excluding margins)
      return {
        x: screenX - margin.left,
        y: screenY - margin.top,
      };
    }

    function inPlotArea(screenX, screenY) {
      const px = screenX - margin.left;
      const py = screenY - margin.top;
      return px >= 0 && px <= plotW && py >= 0 && py <= plotH;
    }

    function drawAxes(ctx, xz, yz) {
      // Grid + ticks are based on zoomed scales (xz/yz), so they always match view.
      const xTicks = xz.ticks(10);
      const yTicks = yz.ticks(10);

      // Grid
      ctx.save();
      ctx.translate(margin.left, margin.top);

      ctx.strokeStyle = getCss("--grid");
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (const t of xTicks) {
        const xx = xz(t);
        if (!isFinite(xx)) continue;
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, plotH);
      }
      for (const t of yTicks) {
        const yy = yz(t);
        if (!isFinite(yy)) continue;
        ctx.moveTo(0, yy);
        ctx.lineTo(plotW, yy);
      }
      ctx.stroke();

      // Axes lines
      ctx.strokeStyle = getCss("--line");
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, plotH);
      ctx.lineTo(plotW, plotH);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, plotH);
      ctx.stroke();

      // Tick labels
      ctx.fillStyle = getCss("--muted");
      ctx.font = "11px " + getCss("--sans", true);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      for (const t of xTicks) {
        const xx = xz(t);
        if (!isFinite(xx)) continue;
        ctx.strokeStyle = getCss("--line");
        ctx.beginPath();
        ctx.moveTo(xx, plotH);
        ctx.lineTo(xx, plotH + 6);
        ctx.stroke();
        ctx.fillText(d3.format("~s")(t), xx, plotH + 8);
      }

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      for (const t of yTicks) {
        const yy = yz(t);
        if (!isFinite(yy)) continue;
        ctx.strokeStyle = getCss("--line");
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(-6, yy);
        ctx.stroke();
        ctx.fillText(d3.format("~s")(t), -8, yy);
      }

      // Axis labels
      ctx.fillStyle = getCss("--muted");
      ctx.font = "12px " + getCss("--sans", true);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Density (kg/m³)", plotW / 2, plotH + 28);

      ctx.save();
      ctx.translate(-44, plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(yLabel(), 0, 0);
      ctx.restore();

      ctx.restore();
    }

    function drawPoints(ctx, visible, feasible, xz, yz) {
      ctx.save();
      ctx.translate(margin.left, margin.top);

      const front = paretoFront(feasible);

      // Frontier
      if (front.length >= 2) {
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < front.length; i++) {
          const d = front[i];
          const xx = xz(d.rho);
          const yy = yz(yValue(d));
          if (!isFinite(xx) || !isFinite(yy)) continue;
          if (i === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
      }

      // Points
      for (const d of visible) {
        const xx = xz(d.rho);
        const yy = yz(yValue(d));
        if (!isFinite(xx) || !isFinite(yy)) continue;

        const ok = isFeasible(d);
        const baseA = ok ? 0.9 : 0.22;
        const soft = d.E >= state.minE ? 1 : 0.7;
        const a = clamp(baseA * soft, 0.08, 0.95);

        const col = d3.color(colourByCat(d.cat));
        const r = Math.max(2, size0(d.E));

        ctx.beginPath();
        ctx.fillStyle = col
          ? `rgba(${col.r},${col.g},${col.b},${a})`
          : `rgba(180,180,180,${a})`;
        ctx.arc(xx, yy, r, 0, Math.PI * 2);
        ctx.fill();

        const isHover = d.id === state.hoverId;
        ctx.lineWidth = isHover ? 1.6 : 1;
        ctx.strokeStyle = isHover
          ? "rgba(255,255,255,0.65)"
          : "rgba(255,255,255,0.12)";
        ctx.stroke();

        if (state.highlightId === d.id) {
          ctx.lineWidth = 2.6;
          ctx.strokeStyle = "rgba(255,255,255,0.85)";
          ctx.beginPath();
          ctx.arc(xx, yy, r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function pickNearest(screenX, screenY, visible, xz, yz) {
      if (!inPlotArea(screenX, screenY)) return null;
      const px = screenX - margin.left;
      const py = screenY - margin.top;

      let best = null;
      let bestD2 = Infinity;

      // Threshold in screen pixels
      const thresh2 = 14 * 14;

      for (const d of visible) {
        const xx = xz(d.rho);
        const yy = yz(yValue(d));
        if (!isFinite(xx) || !isFinite(yy)) continue;
        const dx = xx - px;
        const dy = yy - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
          bestD2 = d2;
          best = d;
        }
      }

      if (best && bestD2 <= thresh2) return best;
      return null;
    }

    p.setup = () => {
      const r = els.canvasHost.getBoundingClientRect();
      hostW = Math.max(10, Math.floor(r.width));
      hostH = Math.max(10, Math.floor(r.height));

      plotW = Math.max(10, hostW - margin.left - margin.right);
      plotH = Math.max(10, hostH - margin.top - margin.bottom);

      canvas = p.createCanvas(hostW, hostH);
      canvas.parent("canvasHost");

      // Attach d3 zoom to the underlying canvas element.
      d3.select(canvas.elt).call(zoom);

      computeScalesForVisible();
      renderBestList();
      syncUIBadges();

      // Tooltip handling (use p5 events, not d3)
      canvas.elt.addEventListener("mousemove", (ev) => {
        const rect = canvas.elt.getBoundingClientRect();
        const sx = ev.clientX - rect.left;
        const sy = ev.clientY - rect.top;

        const visible = MATERIALS.filter(isVisible);
        const xz = state.zoomT.rescaleX(x0);
        const yz = state.zoomT.rescaleY(y0);

        const hit = pickNearest(sx, sy, visible, xz, yz);
        state.hoverId = hit ? hit.id : null;

        if (hit) showTip(sx, sy, hit);
        else hideTip();

        requestRedraw();
      });

      canvas.elt.addEventListener("mouseleave", () => {
        state.hoverId = null;
        hideTip();
        requestRedraw();
      });

      window.addEventListener("resize", () => {
        resizeToHost();
      });
    };

    p.draw = () => {
      if (!needsRedraw) return;
      needsRedraw = false;

      // Clear
      p.clear();
      p.background(0, 0, 0, 0);

      const ctx = p.drawingContext;

      // Paint a subtle backdrop
      ctx.save();
      ctx.fillStyle = "rgba(10,12,16,0.35)";
      ctx.fillRect(0, 0, hostW, hostH);
      ctx.restore();

      if (!x0 || !y0) return;

      const visible = MATERIALS.filter(isVisible);
      const feasible = visible.filter(isFeasible);

      // Accurate zoomed scales
      const xz = state.zoomT.rescaleX(x0);
      const yz = state.zoomT.rescaleY(y0);

      drawAxes(ctx, xz, yz);
      drawPoints(ctx, visible, feasible, xz, yz);
    };
  };

  // Helper to read CSS vars for canvas drawing
  function getCss(varName, raw) {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    if (raw) {
      // CSS vars for fonts are not directly accessible; fallback.
      return v || "system-ui";
    }
    return v || "#ffffff";
  }

  // Start p5
  new p5(sketch);

  // Initial render
  computeScalesForVisible();
  renderBestList();
  syncUIBadges();
})();
