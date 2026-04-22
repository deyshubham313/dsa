const DSA_TOPICS = [
  {
    id: "array",
    title: "Arrays",
    icon: "▦",
    color: "#00f5ff",
    iconBg: "rgba(0,245,255,0.12)",
    difficulty: "easy",
    progress: 0,
    desc: "Contiguous memory blocks. The foundation of every data structure.",
    learn: {
      overview: `An array is a collection of elements stored in <strong>contiguous memory locations</strong>. 
      Elements are accessed via an index, starting at 0. Arrays offer O(1) random access, making them 
      one of the fastest data structures for reading. However, insertions and deletions in the middle 
      are O(n) due to shifting.`,
      useCases: "Use arrays when you need fast random access, fixed-size collections, or as the underlying structure for stacks, queues, and heaps.",
      complexity: [
        { op: "Access", val: "O(1)" },
        { op: "Search", val: "O(n)" },
        { op: "Insert (end)", val: "O(1)*" },
        { op: "Insert (mid)", val: "O(n)" },
        { op: "Delete", val: "O(n)" },
      ],
      code: `<span class="kw">class</span> <span class="fn">DynamicArray</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.data = {};
    <span class="kw">this</span>.length = <span class="num">0</span>;
  }
  <span class="fn">push</span>(item) {
    <span class="kw">this</span>.data[<span class="kw">this</span>.length] = item;
    <span class="kw">this</span>.length++;
  }
  <span class="fn">get</span>(index) {
    <span class="kw">return this</span>.data[index]; <span class="cm">// O(1) access</span>
  }
  <span class="fn">pop</span>() {
    <span class="kw">const</span> last = <span class="kw">this</span>.data[<span class="kw">this</span>.length - <span class="num">1</span>];
    <span class="kw">delete this</span>.data[<span class="kw">this</span>.length - <span class="num">1</span>];
    <span class="kw">this</span>.length--;
    <span class="kw">return</span> last;
  }
}`,
      vizType: "array"
    },
    quiz: [
      {
        q: "What is the time complexity of accessing an element by index in an array?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        answer: 2,
        explanation: "Array access by index is O(1) — constant time — because elements are stored in contiguous memory and the address is computed directly."
      },
      {
        q: "When you insert an element at the beginning of an array of size n, how many elements need to be shifted?",
        options: ["0", "1", "n/2", "n"],
        answer: 3,
        explanation: "All n existing elements must shift right by one position to make room at index 0."
      },
      {
        q: "Which of the following is NOT an advantage of arrays?",
        options: ["Cache-friendly memory layout", "O(1) random access", "Fixed size known at creation", "O(1) insertion at arbitrary index"],
        answer: 3,
        explanation: "Inserting at an arbitrary index requires shifting elements, making it O(n) — not O(1)."
      },
      {
        q: "A 2D array of size m×n stores elements in row-major order. What is the address of element [i][j] given base address B and element size S?",
        options: ["B + (i*n + j)*S", "B + (j*m + i)*S", "B + (i+j)*S", "B + i*j*S"],
        answer: 0,
        explanation: "In row-major order, row i starts at B + i*n*S, and element j within that row adds j*S, giving B + (i*n + j)*S."
      }
    ]
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: "⬡",
    color: "#9b59b6",
    iconBg: "rgba(155,89,182,0.12)",
    difficulty: "easy",
    progress: 0,
    desc: "Dynamic chains of nodes. Efficient insertions, costly lookups.",
    learn: {
      overview: `A Linked List is a linear data structure where elements (<strong>nodes</strong>) are stored 
      non-contiguously in memory. Each node contains data and a pointer to the next node. Unlike arrays, 
      there's no fixed size — nodes are allocated dynamically. The tradeoff: O(n) access vs O(1) head insertions.`,
      useCases: "Use linked lists when you need frequent insertions/deletions at the beginning, unknown or dynamic size, or to implement stacks/queues without size limits.",
      complexity: [
        { op: "Access", val: "O(n)" },
        { op: "Search", val: "O(n)" },
        { op: "Insert (head)", val: "O(1)" },
        { op: "Insert (tail)", val: "O(n)" },
        { op: "Delete (head)", val: "O(1)" },
      ],
      code: `<span class="kw">class</span> <span class="fn">Node</span> {
  <span class="fn">constructor</span>(val) {
    <span class="kw">this</span>.val = val;
    <span class="kw">this</span>.next = <span class="kw">null</span>;
  }
}

<span class="kw">class</span> <span class="fn">LinkedList</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.head = <span class="kw">null</span>; }

  <span class="fn">prepend</span>(val) { <span class="cm">// O(1)</span>
    <span class="kw">const</span> node = <span class="kw">new</span> <span class="fn">Node</span>(val);
    node.next = <span class="kw">this</span>.head;
    <span class="kw">this</span>.head = node;
  }
  <span class="fn">find</span>(val) { <span class="cm">// O(n)</span>
    <span class="kw">let</span> curr = <span class="kw">this</span>.head;
    <span class="kw">while</span>(curr) {
      <span class="kw">if</span>(curr.val === val) <span class="kw">return</span> curr;
      curr = curr.next;
    }
    <span class="kw">return null</span>;
  }
}`,
      vizType: "linked-list"
    },
    quiz: [
      {
        q: "What is the time complexity of inserting a node at the head of a singly linked list?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        answer: 2,
        explanation: "Inserting at the head just creates a new node and updates the head pointer — no traversal needed, so O(1)."
      },
      {
        q: "In a doubly linked list, each node contains:",
        options: ["Only a next pointer", "Data and next pointer", "Data, next, and previous pointers", "Only data"],
        answer: 2,
        explanation: "A doubly linked list stores data plus two pointers: next (to the following node) and prev (to the preceding node)."
      },
      {
        q: "Which algorithm can detect a cycle in a linked list in O(n) time and O(1) space?",
        options: ["Breadth-First Search", "Floyd's Cycle Detection (Tortoise & Hare)", "Hash Set traversal", "Binary Search"],
        answer: 1,
        explanation: "Floyd's algorithm uses two pointers (slow+fast). They meet inside the cycle if one exists — O(n) time, O(1) space."
      },
      {
        q: "What happens to the tail node's next pointer in a singly linked list?",
        options: ["Points to head", "Points to itself", "Is null / undefined", "Points to previous node"],
        answer: 2,
        explanation: "The tail node's next pointer is null (or undefined), signaling the end of the list."
      }
    ]
  },
  {
    id: "stack",
    title: "Stack",
    icon: "⊞",
    color: "#ffd700",
    iconBg: "rgba(255,215,0,0.12)",
    difficulty: "easy",
    progress: 0,
    desc: "LIFO discipline. Push in, pop out — last in, first out.",
    learn: {
      overview: `A Stack is a <strong>LIFO</strong> (Last In, First Out) data structure. Think of a stack of 
      plates — you can only add or remove from the top. The three primary operations are Push (add to top), 
      Pop (remove from top), and Peek (view top without removing). Stacks are used in function call management, 
      undo/redo systems, and expression parsing.`,
      useCases: "Browser history (back button), undo functionality, function call stack, balanced parentheses checking, DFS traversal.",
      complexity: [
        { op: "Push", val: "O(1)" },
        { op: "Pop", val: "O(1)" },
        { op: "Peek", val: "O(1)" },
        { op: "Search", val: "O(n)" },
        { op: "Space", val: "O(n)" },
      ],
      code: `<span class="kw">class</span> <span class="fn">Stack</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.items = []; }

  <span class="fn">push</span>(val) { <span class="cm">// O(1)</span>
    <span class="kw">this</span>.items.push(val);
  }
  <span class="fn">pop</span>() { <span class="cm">// O(1)</span>
    <span class="kw">if</span>(<span class="kw">this</span>.<span class="fn">isEmpty</span>()) <span class="kw">throw</span> <span class="str">"Stack underflow"</span>;
    <span class="kw">return this</span>.items.pop();
  }
  <span class="fn">peek</span>() { <span class="cm">// O(1) - look without removing</span>
    <span class="kw">return this</span>.items[<span class="kw">this</span>.items.length - <span class="num">1</span>];
  }
  <span class="fn">isEmpty</span>() { <span class="kw">return this</span>.items.length === <span class="num">0</span>; }
}

<span class="cm">// Use case: Balanced parentheses check</span>
<span class="kw">function</span> <span class="fn">isBalanced</span>(str) {
  <span class="kw">const</span> s = <span class="kw">new</span> <span class="fn">Stack</span>();
  <span class="kw">for</span>(<span class="kw">let</span> c <span class="kw">of</span> str) {
    <span class="kw">if</span>(c === <span class="str">'('</span>) s.<span class="fn">push</span>(c);
    <span class="kw">else if</span>(c === <span class="str">')'</span>) {
      <span class="kw">if</span>(s.<span class="fn">isEmpty</span>()) <span class="kw">return false</span>;
      s.<span class="fn">pop</span>();
    }
  }
  <span class="kw">return</span> s.<span class="fn">isEmpty</span>();
}`,
      vizType: "stack"
    },
    quiz: [
      {
        q: "A stack is a _____ data structure.",
        options: ["FIFO", "LIFO", "Random access", "Priority-based"],
        answer: 1,
        explanation: "Stack is LIFO — Last In, First Out. The most recently pushed element is the first to be popped."
      },
      {
        q: "Popping from an empty stack is called:",
        options: ["Stack overflow", "Stack underflow", "Null pointer exception", "Index out of bounds"],
        answer: 1,
        explanation: "Attempting to pop from an empty stack is called stack underflow — there's nothing to remove."
      },
      {
        q: "Which real-world scenario best models a stack?",
        options: ["Queue at a bank teller", "A stack of dinner plates", "A hospital waiting list", "CPU scheduling round-robin"],
        answer: 1,
        explanation: "Dinner plates are stacked — you add to the top and remove from the top. Classic LIFO!"
      },
      {
        q: "To reverse a string using a stack, you push all characters and then:",
        options: ["Push again in reverse", "Pop all characters — they come out reversed", "Iterate the stack directly", "Use a second stack"],
        answer: 1,
        explanation: "Pushing all chars then popping produces them in reverse order — LIFO naturally reverses sequences."
      }
    ]
  },
  {
    id: "bst",
    title: "Binary Search Tree",
    icon: "⬡",
    color: "#00ff88",
    iconBg: "rgba(0,255,136,0.12)",
    difficulty: "medium",
    progress: 0,
    desc: "Ordered tree: left < root < right. Efficient search and sort.",
    learn: {
      overview: `A <strong>Binary Search Tree (BST)</strong> is a tree where each node has at most 2 children, 
      and for every node: all values in the left subtree are smaller, and all values in the right subtree 
      are larger. This ordering property enables O(log n) search, insert, and delete on a balanced tree. 
      Worst case (degenerate/skewed tree) degrades to O(n).`,
      useCases: "Database indexing, sorted data with frequent insertions/deletions, implementing sets/maps, range queries.",
      complexity: [
        { op: "Search (avg)", val: "O(log n)" },
        { op: "Insert (avg)", val: "O(log n)" },
        { op: "Delete (avg)", val: "O(log n)" },
        { op: "Worst case", val: "O(n)" },
        { op: "Space", val: "O(n)" },
      ],
      code: `<span class="kw">class</span> <span class="fn">BST</span> {
  <span class="fn">insert</span>(root, val) {
    <span class="kw">if</span>(!root) <span class="kw">return</span> { val, left:<span class="kw">null</span>, right:<span class="kw">null</span> };
    <span class="kw">if</span>(val < root.val)
      root.left = <span class="kw">this</span>.<span class="fn">insert</span>(root.left, val);
    <span class="kw">else if</span>(val > root.val)
      root.right = <span class="kw">this</span>.<span class="fn">insert</span>(root.right, val);
    <span class="kw">return</span> root;
  }
  <span class="fn">search</span>(root, val) { <span class="cm">// O(log n) avg</span>
    <span class="kw">if</span>(!root || root.val === val) <span class="kw">return</span> root;
    <span class="kw">return</span> val < root.val
      ? <span class="kw">this</span>.<span class="fn">search</span>(root.left, val)
      : <span class="kw">this</span>.<span class="fn">search</span>(root.right, val);
  }
  <span class="fn">inorder</span>(root, res=[]) { <span class="cm">// Produces sorted output!</span>
    <span class="kw">if</span>(!root) <span class="kw">return</span> res;
    <span class="kw">this</span>.<span class="fn">inorder</span>(root.left, res);
    res.<span class="fn">push</span>(root.val);
    <span class="kw">this</span>.<span class="fn">inorder</span>(root.right, res);
    <span class="kw">return</span> res;
  }
}`,
      vizType: "bst"
    },
    quiz: [
      {
        q: "In a BST, where are values smaller than the root stored?",
        options: ["Right subtree", "Left subtree", "At the same level", "Root is always smallest"],
        answer: 1,
        explanation: "BST property: values less than the root go to the LEFT subtree; greater values go right."
      },
      {
        q: "What traversal of a BST produces elements in sorted (ascending) order?",
        options: ["Preorder", "Postorder", "Inorder", "Level-order"],
        answer: 2,
        explanation: "Inorder traversal (Left → Root → Right) of a BST visits nodes in ascending sorted order."
      },
      {
        q: "A BST with nodes inserted in order 1,2,3,4,5 becomes:",
        options: ["A balanced tree", "A right-skewed linear chain (worst case)", "A complete binary tree", "An AVL tree"],
        answer: 1,
        explanation: "Inserting sorted data creates a right-skewed tree — essentially a linked list, giving O(n) performance."
      },
      {
        q: "Which self-balancing variant of BST guarantees O(log n) worst case?",
        options: ["Treap", "Splay Tree", "AVL Tree / Red-Black Tree", "Min-Heap"],
        answer: 2,
        explanation: "AVL trees and Red-Black trees maintain balance automatically, guaranteeing O(log n) for all operations."
      }
    ]
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: "⟨⟩",
    color: "#ff4757",
    iconBg: "rgba(255,71,87,0.12)",
    difficulty: "medium",
    progress: 0,
    desc: "Bubble, Merge, Quick — master the art of ordering.",
    learn: {
      overview: `Sorting algorithms arrange elements in order. <strong>Bubble Sort</strong> O(n²) — simple, 
      compares adjacent pairs. <strong>Merge Sort</strong> O(n log n) — divide & conquer, stable, reliable. 
      <strong>Quick Sort</strong> O(n log n) avg — fast in practice, pivot-based partitioning. 
      <strong>Heap Sort</strong> O(n log n) — uses a max-heap, in-place but not stable.`,
      useCases: "Database query results, UI list ordering, search preprocessing, event scheduling, file system organization.",
      complexity: [
        { op: "Bubble Sort", val: "O(n²)" },
        { op: "Merge Sort", val: "O(n log n)" },
        { op: "Quick Sort", val: "O(n log n)" },
        { op: "Heap Sort", val: "O(n log n)" },
        { op: "Counting Sort", val: "O(n+k)" },
      ],
      code: `<span class="cm">// Merge Sort — Divide & Conquer O(n log n)</span>
<span class="kw">function</span> <span class="fn">mergeSort</span>(arr) {
  <span class="kw">if</span>(arr.length <= <span class="num">1</span>) <span class="kw">return</span> arr;
  <span class="kw">const</span> mid = Math.<span class="fn">floor</span>(arr.length / <span class="num">2</span>);
  <span class="kw">const</span> L = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(<span class="num">0</span>, mid));
  <span class="kw">const</span> R = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(mid));
  <span class="kw">return</span> <span class="fn">merge</span>(L, R);
}
<span class="kw">function</span> <span class="fn">merge</span>(L, R) {
  <span class="kw">const</span> res = []; <span class="kw">let</span> i=<span class="num">0</span>, j=<span class="num">0</span>;
  <span class="kw">while</span>(i<L.length && j<R.length)
    res.<span class="fn">push</span>(L[i]<=R[j] ? L[i++] : R[j++]);
  <span class="kw">return</span> res.<span class="fn">concat</span>(L.<span class="fn">slice</span>(i)).<span class="fn">concat</span>(R.<span class="fn">slice</span>(j));
}

<span class="cm">// Quick Sort — Pivot partitioning O(n log n) avg</span>
<span class="kw">function</span> <span class="fn">quickSort</span>(arr, lo=<span class="num">0</span>, hi=arr.length-<span class="num">1</span>) {
  <span class="kw">if</span>(lo >= hi) <span class="kw">return</span>;
  <span class="kw">const</span> p = <span class="fn">partition</span>(arr, lo, hi);
  <span class="fn">quickSort</span>(arr, lo, p-<span class="num">1</span>);
  <span class="fn">quickSort</span>(arr, p+<span class="num">1</span>, hi);
}`,
      vizType: "sorting"
    },
    quiz: [
      {
        q: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        answer: 2,
        explanation: "When the pivot is always the smallest or largest element (sorted/reverse-sorted input), Quick Sort degrades to O(n²)."
      },
      {
        q: "Which sorting algorithm is STABLE (preserves relative order of equal elements)?",
        options: ["Heap Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
        answer: 2,
        explanation: "Merge Sort is stable — equal elements maintain their original relative order. Heap Sort and Quick Sort are generally not stable."
      },
      {
        q: "Counting Sort achieves O(n+k) time. What does 'k' represent?",
        options: ["Number of comparisons", "The range of input values", "Stack depth", "Number of passes"],
        answer: 1,
        explanation: "k is the range of input values. Counting Sort counts occurrences across this range, so large ranges make it impractical."
      },
      {
        q: "Merge Sort uses _____ extra space.",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 2,
        explanation: "Merge Sort requires O(n) auxiliary space for the temporary arrays used during merging."
      }
    ]
  },
  {
    id: "graph",
    title: "Graphs & BFS/DFS",
    icon: "◎",
    color: "#e056fd",
    iconBg: "rgba(224,86,253,0.12)",
    difficulty: "hard",
    progress: 0,
    desc: "Networks of vertices and edges. BFS, DFS, and shortest paths.",
    learn: {
      overview: `A <strong>Graph</strong> G = (V, E) consists of vertices (nodes) and edges (connections). 
      Graphs can be directed or undirected, weighted or unweighted. <strong>BFS</strong> (Breadth-First Search) 
      explores level by level using a queue — ideal for shortest path in unweighted graphs. 
      <strong>DFS</strong> (Depth-First Search) explores as deep as possible using a stack/recursion — 
      ideal for cycle detection, topological sort, and connected components.`,
      useCases: "Social networks, GPS navigation, web crawlers, dependency resolution, network routing, game AI pathfinding.",
      complexity: [
        { op: "BFS / DFS", val: "O(V + E)" },
        { op: "Dijkstra", val: "O((V+E) log V)" },
        { op: "Bellman-Ford", val: "O(VE)" },
        { op: "Floyd-Warshall", val: "O(V³)" },
        { op: "Space", val: "O(V)" },
      ],
      code: `<span class="cm">// BFS — Level-by-level using Queue</span>
<span class="kw">function</span> <span class="fn">bfs</span>(graph, start) {
  <span class="kw">const</span> visited = <span class="kw">new</span> <span class="fn">Set</span>([start]);
  <span class="kw">const</span> queue = [start];
  <span class="kw">while</span>(queue.length) {
    <span class="kw">const</span> node = queue.<span class="fn">shift</span>();
    <span class="fn">process</span>(node);
    <span class="kw">for</span>(<span class="kw">let</span> nb <span class="kw">of</span> graph[node])
      <span class="kw">if</span>(!visited.<span class="fn">has</span>(nb)) {
        visited.<span class="fn">add</span>(nb);
        queue.<span class="fn">push</span>(nb);
      }
  }
}

<span class="cm">// DFS — Deep dive using Recursion</span>
<span class="kw">function</span> <span class="fn">dfs</span>(graph, node, visited=<span class="kw">new</span> <span class="fn">Set</span>()) {
  visited.<span class="fn">add</span>(node);
  <span class="fn">process</span>(node);
  <span class="kw">for</span>(<span class="kw">let</span> nb <span class="kw">of</span> graph[node])
    <span class="kw">if</span>(!visited.<span class="fn">has</span>(nb))
      <span class="fn">dfs</span>(graph, nb, visited);
}`,
      vizType: "graph"
    },
    quiz: [
      {
        q: "BFS uses a _____ while DFS uses a _____ (or recursion).",
        options: ["Stack, Queue", "Queue, Stack", "Heap, Queue", "Array, Linked List"],
        answer: 1,
        explanation: "BFS uses a Queue (FIFO) for level-by-level exploration. DFS uses a Stack (LIFO) — either explicit or via recursion."
      },
      {
        q: "Which algorithm finds the shortest path in an UNWEIGHTED graph?",
        options: ["Dijkstra's Algorithm", "BFS", "DFS", "Bellman-Ford"],
        answer: 1,
        explanation: "BFS naturally finds the shortest path in unweighted graphs because it explores level by level, guaranteeing minimum hops."
      },
      {
        q: "A directed graph with no cycles is called:",
        options: ["Undirected Graph", "Complete Graph", "DAG (Directed Acyclic Graph)", "Bipartite Graph"],
        answer: 2,
        explanation: "A Directed Acyclic Graph (DAG) has directed edges and no cycles. Used in task scheduling, build systems, etc."
      },
      {
        q: "What is the time complexity of BFS/DFS where V = vertices, E = edges?",
        options: ["O(V²)", "O(E log V)", "O(V + E)", "O(V × E)"],
        answer: 2,
        explanation: "BFS and DFS both visit every vertex and edge once, giving O(V + E) time complexity."
      }
    ]
  }
];
