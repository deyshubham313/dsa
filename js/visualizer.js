/* ═══════════════════════════════════════════════════
   VISUALIZATION ENGINE — DSA Learning Platform
   Handles: Array, Linked List, Stack, BST, Sorting, Graph
═══════════════════════════════════════════════════ */

const Viz = (() => {

  /* ─── ARRAY VISUALIZATION ─── */
  function renderArray(container, data = [14, 7, 22, 3, 18, 11, 5, 9]) {
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.arrayDemo('${container.id}', 'access')">Access [3]</button>
        <button class="btn btn-outline" onclick="Viz.arrayDemo('${container.id}', 'search')">Search 18</button>
        <button class="btn btn-outline" onclick="Viz.arrayDemo('${container.id}', 'reset')">↺ Reset</button>
      </div>
      <div class="viz-array" id="${container.id}-bars"></div>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:8px" id="${container.id}-msg">Click an operation above</div>
    `;
    drawArrayBars(container.id, data);
  }

  function drawArrayBars(cid, data, highlights = {}) {
    const el = document.getElementById(cid + '-bars');
    if (!el) return;
    const maxV = Math.max(...data);
    el.innerHTML = data.map((v, i) => `
      <div class="viz-bar ${highlights[i] || ''}" style="height:${Math.max(24, (v / maxV) * 120)}px">
        <span>${v}</span>
      </div>
    `).join('') + `
      <div style="display:flex;gap:6px;align-items:flex-end;margin-left:8px">
        ${data.map((_, i) => `<div style="width:36px;text-align:center;font-size:0.65rem;color:var(--text-muted);margin-top:4px">[${i}]</div>`).join('')}
      </div>`;
  }

  const arrayData = [14, 7, 22, 3, 18, 11, 5, 9];
  async function arrayDemo(cid, op) {
    const msg = document.getElementById(cid + '-msg');
    if (op === 'reset') { drawArrayBars(cid, arrayData); msg.textContent = 'Click an operation above'; return; }
    if (op === 'access') {
      msg.textContent = '⚡ Direct access to index [3] → O(1)';
      drawArrayBars(cid, arrayData, { 3: 'comparing' });
      await sleep(600);
      drawArrayBars(cid, arrayData, { 3: 'sorted' });
    }
    if (op === 'search') {
      msg.textContent = '🔍 Linear search for value 18...';
      for (let i = 0; i < arrayData.length; i++) {
        drawArrayBars(cid, arrayData, { [i]: 'comparing' });
        await sleep(350);
        if (arrayData[i] === 18) {
          drawArrayBars(cid, arrayData, { [i]: 'sorted' });
          msg.textContent = `✅ Found 18 at index [${i}] — checked ${i + 1} elements`;
          return;
        }
      }
    }
  }

  /* ─── LINKED LIST VISUALIZATION ─── */
  function renderLinkedList(container) {
    let nodes = [12, 7, 3, 19, 5];
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.llDemo('${container.id}', 'prepend')">Prepend 99</button>
        <button class="btn btn-outline" onclick="Viz.llDemo('${container.id}', 'traverse')">Traverse</button>
        <button class="btn btn-outline" onclick="Viz.llDemo('${container.id}', 'reset')">↺ Reset</button>
      </div>
      <div class="viz-nodes" id="${container.id}-nodes"></div>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:12px" id="${container.id}-msg">Click an operation</div>
    `;
    drawLinkedList(container.id, nodes);
    container._nodes = nodes;
  }

  function drawLinkedList(cid, nodes, highlight = -1) {
    const el = document.getElementById(cid + '-nodes');
    if (!el) return;
    el.innerHTML = nodes.map((v, i) => `
      <div class="viz-node">
        <div class="node-box ${i === highlight ? 'highlight' : ''}">${v}</div>
        ${i < nodes.length - 1 ? '<div class="node-arrow"></div>' : '<div class="node-arrow"></div><div class="node-null">null</div>'}
      </div>
    `).join('');
  }

  async function llDemo(cid, op) {
    const msg = document.getElementById(cid + '-msg');
    const container = document.getElementById(cid);
    let nodes = container._nodes || [12, 7, 3, 19, 5];

    if (op === 'reset') {
      container._nodes = [12, 7, 3, 19, 5];
      drawLinkedList(cid, container._nodes);
      msg.textContent = 'Click an operation';
      return;
    }
    if (op === 'prepend') {
      nodes.unshift(99);
      container._nodes = nodes;
      drawLinkedList(cid, nodes, 0);
      msg.textContent = '⚡ Prepended 99 to head — O(1)';
    }
    if (op === 'traverse') {
      msg.textContent = '🔗 Traversing list...';
      for (let i = 0; i < nodes.length; i++) {
        drawLinkedList(cid, nodes, i);
        await sleep(400);
      }
      drawLinkedList(cid, nodes);
      msg.textContent = `✅ Traversed ${nodes.length} nodes — O(n)`;
    }
  }

  /* ─── STACK VISUALIZATION ─── */
  function renderStack(container) {
    let items = ['C', 'B', 'A'];
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.stackDemo('${container.id}', 'push')">Push 'D'</button>
        <button class="btn btn-outline" onclick="Viz.stackDemo('${container.id}', 'pop')">Pop</button>
        <button class="btn btn-outline" onclick="Viz.stackDemo('${container.id}', 'peek')">Peek</button>
      </div>
      <div style="display:flex;gap:24px;align-items:flex-end">
        <div>
          <div style="font-size:0.7rem;color:var(--text-muted);letter-spacing:1px;margin-bottom:8px">▲ TOP</div>
          <div class="viz-stack" id="${container.id}-stack"></div>
          <div style="font-size:0.7rem;color:var(--text-muted);letter-spacing:1px;margin-top:8px">▼ BOTTOM</div>
        </div>
      </div>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:12px" id="${container.id}-msg">LIFO — Last In, First Out</div>
    `;
    container._items = items;
    drawStack(container.id, items);
  }

  function drawStack(cid, items) {
    const el = document.getElementById(cid + '-stack');
    if (!el) return;
    // Render bottom-to-top (index 0 = bottom, last = top)
    el.innerHTML = [...items].reverse().map((v, i) => `
      <div class="stack-item ${i === 0 ? 'top-item' : ''}">${v}</div>
    `).join('');
  }

  const pushLabels = ['D', 'E', 'F', 'G', 'H'];
  let pushIdx = 0;
  async function stackDemo(cid, op) {
    const msg = document.getElementById(cid + '-msg');
    const container = document.getElementById(cid);
    let items = container._items || ['C', 'B', 'A'];

    if (op === 'push') {
      const val = pushLabels[pushIdx++ % pushLabels.length];
      items.push(val);
      container._items = items;
      drawStack(cid, items);
      // Animate new top
      const stackEl = document.getElementById(cid + '-stack');
      const topEl = stackEl?.querySelector('.stack-item');
      if (topEl) topEl.classList.add('new-item');
      msg.textContent = `⬆ Pushed '${val}' — O(1). Size: ${items.length}`;
    }
    if (op === 'pop') {
      if (items.length === 0) { msg.textContent = '❌ Stack underflow!'; return; }
      const val = items.pop();
      container._items = items;
      drawStack(cid, items);
      msg.textContent = `⬇ Popped '${val}' — O(1). Size: ${items.length}`;
    }
    if (op === 'peek') {
      if (items.length === 0) { msg.textContent = '❌ Stack is empty!'; return; }
      msg.textContent = `👁 Peek: top is '${items[items.length - 1]}' — O(1), not removed`;
    }
  }

  /* ─── BST VISUALIZATION ─── */
  function renderBST(container) {
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.bstDemo('${container.id}', 'search', 7)">Search 7</button>
        <button class="btn btn-outline" onclick="Viz.bstDemo('${container.id}', 'inorder')">Inorder</button>
        <button class="btn btn-outline" onclick="Viz.bstDemo('${container.id}', 'reset')">↺ Reset</button>
      </div>
      <svg class="tree-svg" id="${container.id}-svg" viewBox="0 0 500 220"></svg>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:8px" id="${container.id}-msg">BST: left < root < right</div>
    `;
    drawBST(container.id, []);
  }

  const bstNodes = [
    { id: 1, val: 10, x: 250, y: 30,  parent: null, side: null },
    { id: 2, val: 5,  x: 140, y: 90,  parent: 1, side: 'left' },
    { id: 3, val: 15, x: 360, y: 90,  parent: 1, side: 'right' },
    { id: 4, val: 3,  x: 80,  y: 155, parent: 2, side: 'left' },
    { id: 5, val: 7,  x: 200, y: 155, parent: 2, side: 'right' },
    { id: 6, val: 12, x: 300, y: 155, parent: 3, side: 'left' },
    { id: 7, val: 18, x: 420, y: 155, parent: 3, side: 'right' },
  ];

  function drawBST(cid, activeIds) {
    const svg = document.getElementById(cid + '-svg');
    if (!svg) return;
    const edges = bstNodes.filter(n => n.parent).map(n => {
      const p = bstNodes.find(x => x.id === n.parent);
      return `<line class="tree-edge" x1="${p.x}" y1="${p.y}" x2="${n.x}" y2="${n.y}"/>`;
    });
    const nodes = bstNodes.map(n => `
      <g class="tree-node">
        <circle cx="${n.x}" cy="${n.y}" r="22" class="${activeIds.includes(n.id) ? 'active' : ''}"/>
        <text x="${n.x}" y="${n.y + 5}" text-anchor="middle">${n.val}</text>
      </g>
    `);
    svg.innerHTML = edges.join('') + nodes.join('');
  }

  async function bstDemo(cid, op, val) {
    const msg = document.getElementById(cid + '-msg');
    if (op === 'reset') { drawBST(cid, []); msg.textContent = 'BST: left < root < right'; return; }
    if (op === 'search') {
      msg.textContent = `🔍 Searching for ${val}...`;
      // Simulate search path: 10 → 5 → 7
      const path = [1, 2, 5];
      for (let i = 0; i < path.length; i++) {
        drawBST(cid, path.slice(0, i + 1));
        await sleep(600);
      }
      msg.textContent = `✅ Found ${val}! Path: 10 → 5 → 7 (3 comparisons, O(log n))`;
    }
    if (op === 'inorder') {
      msg.textContent = '🔄 Inorder traversal (Left→Root→Right)...';
      const order = [4, 2, 5, 1, 6, 3, 7]; // inorder IDs
      for (let i = 0; i < order.length; i++) {
        drawBST(cid, [order[i]]);
        await sleep(450);
      }
      drawBST(cid, []);
      msg.textContent = '✅ Inorder result: 3, 5, 7, 10, 12, 15, 18 (sorted!)';
    }
  }

  /* ─── SORTING VISUALIZATION ─── */
  let sortRunning = false;
  function renderSorting(container) {
    const data = [64, 34, 25, 12, 22, 11, 90, 45, 7, 55];
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.sortDemo('${container.id}', 'bubble')">Bubble Sort</button>
        <button class="btn btn-outline" onclick="Viz.sortDemo('${container.id}', 'selection')">Selection Sort</button>
        <button class="btn btn-outline" onclick="Viz.sortDemo('${container.id}', 'reset')">↺ Reset</button>
      </div>
      <div class="viz-array" id="${container.id}-bars"></div>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:8px" id="${container.id}-msg">Choose a sorting algorithm</div>
    `;
    container._sortData = [...data];
    drawSortBars(container.id, data, {});
  }

  function drawSortBars(cid, data, states) {
    const el = document.getElementById(cid + '-bars');
    if (!el) return;
    const maxV = Math.max(...data);
    el.innerHTML = data.map((v, i) => `
      <div class="viz-bar ${states[i] || ''}" style="height:${Math.max(16, (v / maxV) * 130)}px">
        <span>${v}</span>
      </div>
    `).join('');
  }

  const originalSort = [64, 34, 25, 12, 22, 11, 90, 45, 7, 55];
  async function sortDemo(cid, algo) {
    if (sortRunning) return;
    const msg = document.getElementById(cid + '-msg');
    const container = document.getElementById(cid);

    if (algo === 'reset') {
      sortRunning = false;
      container._sortData = [...originalSort];
      drawSortBars(cid, originalSort, {});
      msg.textContent = 'Choose a sorting algorithm';
      return;
    }

    sortRunning = true;
    const arr = [...originalSort];
    const n = arr.length;

    if (algo === 'bubble') {
      msg.textContent = '🫧 Bubble Sort — comparing adjacent pairs...';
      for (let i = 0; i < n - 1 && sortRunning; i++) {
        for (let j = 0; j < n - i - 1 && sortRunning; j++) {
          drawSortBars(cid, arr, { [j]: 'comparing', [j+1]: 'comparing' });
          await sleep(180);
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            drawSortBars(cid, arr, { [j]: 'swapping', [j+1]: 'swapping' });
            await sleep(180);
          }
        }
        const doneState = {};
        for (let k = n - i - 1; k < n; k++) doneState[k] = 'sorted';
        drawSortBars(cid, arr, doneState);
      }
      drawSortBars(cid, arr, Object.fromEntries(arr.map((_, i) => [i, 'sorted'])));
      msg.textContent = '✅ Bubble Sort complete! Largest bubbled to right each pass.';
    }

    if (algo === 'selection') {
      msg.textContent = '🎯 Selection Sort — finding minimum each pass...';
      for (let i = 0; i < n - 1 && sortRunning; i++) {
        let minIdx = i;
        drawSortBars(cid, arr, { [i]: 'comparing' });
        await sleep(150);
        for (let j = i + 1; j < n && sortRunning; j++) {
          drawSortBars(cid, arr, { [minIdx]: 'comparing', [j]: 'comparing' });
          await sleep(150);
          if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          drawSortBars(cid, arr, { [i]: 'swapping', [minIdx]: 'swapping' });
          await sleep(200);
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
        const doneState = {};
        for (let k = 0; k <= i; k++) doneState[k] = 'sorted';
        drawSortBars(cid, arr, doneState);
      }
      drawSortBars(cid, arr, Object.fromEntries(arr.map((_, i) => [i, 'sorted'])));
      msg.textContent = '✅ Selection Sort complete! Found & placed minimum each pass.';
    }

    sortRunning = false;
  }

  /* ─── GRAPH VISUALIZATION ─── */
  function renderGraph(container) {
    container.innerHTML = `
      <div class="viz-controls">
        <button class="btn btn-outline" onclick="Viz.graphDemo('${container.id}', 'bfs')">BFS from A</button>
        <button class="btn btn-outline" onclick="Viz.graphDemo('${container.id}', 'dfs')">DFS from A</button>
        <button class="btn btn-outline" onclick="Viz.graphDemo('${container.id}', 'reset')">↺ Reset</button>
      </div>
      <svg style="width:100%;max-width:480px;height:200px" id="${container.id}-svg" viewBox="0 0 480 200"></svg>
      <div style="color:var(--text-muted);font-size:0.78rem;margin-top:8px" id="${container.id}-msg">BFS: level by level | DFS: deep first</div>
    `;
    drawGraph(container.id, []);
  }

  const graphNodes = {
    A: { x: 80,  y: 100, neighbors: ['B', 'C'] },
    B: { x: 180, y: 50,  neighbors: ['A', 'D', 'E'] },
    C: { x: 180, y: 150, neighbors: ['A', 'E', 'F'] },
    D: { x: 300, y: 30,  neighbors: ['B'] },
    E: { x: 300, y: 110, neighbors: ['B', 'C', 'G'] },
    F: { x: 300, y: 185, neighbors: ['C'] },
    G: { x: 410, y: 100, neighbors: ['E'] },
  };

  function drawGraph(cid, activeSet, visitedSet = []) {
    const svg = document.getElementById(cid + '-svg');
    if (!svg) return;
    const drawn = new Set();
    let edges = '';
    for (const [k, v] of Object.entries(graphNodes)) {
      for (const nb of v.neighbors) {
        const key = [k, nb].sort().join('-');
        if (!drawn.has(key)) {
          drawn.add(key);
          const isActive = activeSet.includes(k) && activeSet.includes(nb);
          edges += `<line x1="${v.x}" y1="${v.y}" x2="${graphNodes[nb].x}" y2="${graphNodes[nb].y}" 
            stroke="${isActive ? 'rgba(0,245,255,0.7)' : 'rgba(0,245,255,0.2)'}" stroke-width="${isActive ? 2 : 1.5}"/>`;
        }
      }
    }
    let nodes = '';
    for (const [k, v] of Object.entries(graphNodes)) {
      const active = activeSet.includes(k);
      const visited = visitedSet.includes(k);
      nodes += `
        <circle cx="${v.x}" cy="${v.y}" r="20" fill="${active ? 'rgba(255,215,0,0.2)' : visited ? 'rgba(0,255,136,0.15)' : 'rgba(13,21,32,0.8)'}" 
          stroke="${active ? '#ffd700' : visited ? '#00ff88' : 'rgba(0,245,255,0.5)'}" stroke-width="2"/>
        <text x="${v.x}" y="${v.y+5}" text-anchor="middle" fill="${active ? '#ffd700' : visited ? '#00ff88' : 'rgba(0,245,255,0.9)'}" 
          font-family="Orbitron,monospace" font-size="13" font-weight="700">${k}</text>
      `;
    }
    svg.innerHTML = edges + nodes;
  }

  async function graphDemo(cid, algo) {
    const msg = document.getElementById(cid + '-msg');
    if (algo === 'reset') { drawGraph(cid, []); msg.textContent = 'BFS: level by level | DFS: deep first'; return; }

    if (algo === 'bfs') {
      msg.textContent = '🌊 BFS — exploring level by level using Queue...';
      const order = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const visited = [];
      for (const node of order) {
        drawGraph(cid, [node], visited);
        msg.textContent = `Queue: visiting ${node} | Visited: [${visited.join(', ')}]`;
        await sleep(600);
        visited.push(node);
      }
      drawGraph(cid, [], visited);
      msg.textContent = '✅ BFS order: A → B → C → D → E → F → G (level by level)';
    }

    if (algo === 'dfs') {
      msg.textContent = '🌀 DFS — diving deep using Stack/Recursion...';
      const order = ['A', 'B', 'D', 'E', 'C', 'F', 'G'];
      const visited = [];
      for (const node of order) {
        drawGraph(cid, [node], visited);
        msg.textContent = `Stack: visiting ${node} | Visited: [${visited.join(', ')}]`;
        await sleep(600);
        visited.push(node);
      }
      drawGraph(cid, [], visited);
      msg.textContent = '✅ DFS order: A → B → D → E → G → C → F (depth first)';
    }
  }

  /* ─── HELPERS ─── */
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* ─── PUBLIC API ─── */
  return {
    render(type, container) {
      const map = {
        'array':       renderArray,
        'linked-list': renderLinkedList,
        'stack':       renderStack,
        'bst':         renderBST,
        'sorting':     renderSorting,
        'graph':       renderGraph,
      };
      if (map[type]) map[type](container);
    },
    arrayDemo, llDemo, stackDemo, bstDemo, sortDemo, graphDemo
  };
})();
