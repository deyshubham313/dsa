import streamlit as st
import streamlit.components.v1 as components
import json

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="DSA.learn — Data Structures & Algorithms",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --- DATA ---
DSA_TOPICS = [
    {
        "id": "array",
        "title": "Arrays",
        "icon": "▦",
        "color": "#00f5ff",
        "iconBg": "rgba(0,245,255,0.12)",
        "difficulty": "easy",
        "desc": "Contiguous memory blocks. The foundation of every data structure.",
        "learn": {
            "overview": "An array is a collection of elements stored in <strong>contiguous memory locations</strong>. Elements are accessed via an index, starting at 0. Arrays offer O(1) random access, making them one of the fastest data structures for reading. However, insertions and deletions in the middle are O(n) due to shifting.",
            "useCases": "Use arrays when you need fast random access, fixed-size collections, or as the underlying structure for stacks, queues, and heaps.",
            "complexity": [
                {"op": "Access", "val": "O(1)"},
                {"op": "Search", "val": "O(n)"},
                {"op": "Insert (end)", "val": "O(1)*"},
                {"op": "Insert (mid)", "val": "O(n)"},
                {"op": "Delete", "val": "O(n)"},
            ],
            "code": "class DynamicArray {\n  constructor() {\n    this.data = {};\n    this.length = 0;\n  }\n  push(item) {\n    this.data[this.length] = item;\n    this.length++;\n  }\n  get(index) {\n    return this.data[index]; // O(1) access\n  }\n  pop() {\n    const last = this.data[this.length - 1];\n    delete this.data[this.length - 1];\n    this.length--;\n    return last;\n  }\n}",
            "vizType": "array"
        },
        "quiz": [
            {
                "q": "What is the time complexity of accessing an element by index in an array?",
                "options": ["O(n)", "O(log n)", "O(1)", "O(n²)"],
                "answer": 2,
                "explanation": "Array access by index is O(1) — constant time — because elements are stored in contiguous memory and the address is computed directly."
            },
            {
                "q": "When you insert an element at the beginning of an array of size n, how many elements need to be shifted?",
                "options": ["0", "1", "n/2", "n"],
                "answer": 3,
                "explanation": "All n existing elements must shift right by one position to make room at index 0."
            },
            {
                "q": "Which of the following is NOT an advantage of arrays?",
                "options": ["Cache-friendly memory layout", "O(1) random access", "Fixed size known at creation", "O(1) insertion at arbitrary index"],
                "answer": 3,
                "explanation": "Inserting at an arbitrary index requires shifting elements, making it O(n) — not O(1)."
            },
            {
                "q": "A 2D array of size m×n stores elements in row-major order. What is the address of element [i][j] given base address B and element size S?",
                "options": ["B + (i*n + j)*S", "B + (j*m + i)*S", "B + (i+j)*S", "B + i*j*S"],
                "answer": 0,
                "explanation": "In row-major order, row i starts at B + i*n*S, and element j within that row adds j*S, giving B + (i*n + j)*S."
            }
        ]
    },
    {
        "id": "linked-list",
        "title": "Linked Lists",
        "icon": "⬡",
        "color": "#9b59b6",
        "iconBg": "rgba(155,89,182,0.12)",
        "difficulty": "easy",
        "desc": "Dynamic chains of nodes. Efficient insertions, costly lookups.",
        "learn": {
            "overview": "A Linked List is a linear data structure where elements (<strong>nodes</strong>) are stored non-contiguously in memory. Each node contains data and a pointer to the next node. Unlike arrays, there's no fixed size — nodes are allocated dynamically. The tradeoff: O(n) access vs O(1) head insertions.",
            "useCases": "Use linked lists when you need frequent insertions/deletions at the beginning, unknown or dynamic size, or to implement stacks/queues without size limits.",
            "complexity": [
                {"op": "Access", "val": "O(n)"},
                {"op": "Search", "val": "O(n)"},
                {"op": "Insert (head)", "val": "O(1)"},
                {"op": "Insert (tail)", "val": "O(n)"},
                {"op": "Delete (head)", "val": "O(1)"},
            ],
            "code": "class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() { this.head = null; }\n\n  prepend(val) { // O(1)\n    const node = new Node(val);\n    node.next = this.head;\n    this.head = node;\n  }\n  find(val) { // O(n)\n    let curr = this.head;\n    while(curr) {\n      if(curr.val === val) return curr;\n      curr = curr.next;\n    }\n    return null;\n  }\n}",
            "vizType": "linked-list"
        },
        "quiz": [
            {
                "q": "What is the time complexity of inserting a node at the head of a singly linked list?",
                "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                "answer": 2,
                "explanation": "Inserting at the head just creates a new node and updates the head pointer — no traversal needed, so O(1)."
            },
            {
                "q": "In a doubly linked list, each node contains:",
                "options": ["Only a next pointer", "Data and next pointer", "Data, next, and previous pointers", "Only data"],
                "answer": 2,
                "explanation": "A doubly linked list stores data plus two pointers: next (to the following node) and prev (to the preceding node)."
            },
            {
                "q": "Which algorithm can detect a cycle in a linked list in O(n) time and O(1) space?",
                "options": ["Breadth-First Search", "Floyd's Cycle Detection (Tortoise & Hare)", "Hash Set traversal", "Binary Search"],
                "answer": 1,
                "explanation": "Floyd's algorithm uses two pointers (slow+fast). They meet inside the cycle if one exists — O(n) time, O(1) space."
            },
            {
                "q": "What happens to the tail node's next pointer in a singly linked list?",
                "options": ["Points to head", "Points to itself", "Is null / undefined", "Points to previous node"],
                "answer": 2,
                "explanation": "The tail node's next pointer is null (or undefined), signaling the end of the list."
            }
        ]
    },
    {
        "id": "stack",
        "title": "Stack",
        "icon": "⊞",
        "color": "#ffd700",
        "iconBg": "rgba(255,215,0,0.12)",
        "difficulty": "easy",
        "desc": "LIFO discipline. Push in, pop out — last in, first out.",
        "learn": {
            "overview": "A Stack is a <strong>LIFO</strong> (Last In, First Out) data structure. Think of a stack of plates — you can only add or remove from the top. The three primary operations are Push (add to top), Pop (remove from top), and Peek (view top without removing). Stacks are used in function call management, undo/redo systems, and expression parsing.",
            "useCases": "Browser history (back button), undo functionality, function call stack, balanced parentheses checking, DFS traversal.",
            "complexity": [
                {"op": "Push", "val": "O(1)"},
                {"op": "Pop", "val": "O(1)"},
                {"op": "Peek", "val": "O(1)"},
                {"op": "Search", "val": "O(n)"},
                {"op": "Space", "val": "O(n)"},
            ],
            "code": "class Stack {\n  constructor() { this.items = []; }\n\n  push(val) { // O(1)\n    this.items.push(val);\n  }\n  pop() { // O(1)\n    if(this.isEmpty()) throw \"Stack underflow\";\n    return this.items.pop();\n  }\n  peek() { // O(1) - look without removing\n    return this.items[this.items.length - 1];\n  }\n  isEmpty() { return this.items.length === 0; }\n}",
            "vizType": "stack"
        },
        "quiz": [
            {
                "q": "A stack is a _____ data structure.",
                "options": ["FIFO", "LIFO", "Random access", "Priority-based"],
                "answer": 1,
                "explanation": "Stack is LIFO — Last In, First Out. The most recently pushed element is the first to be popped."
            },
            {
                "q": "Popping from an empty stack is called:",
                "options": ["Stack overflow", "Stack underflow", "Null pointer exception", "Index out of bounds"],
                "answer": 1,
                "explanation": "Attempting to pop from an empty stack is called stack underflow — there's nothing to remove."
            },
            {
                "q": "Which real-world scenario best models a stack?",
                "options": ["Queue at a bank teller", "A stack of dinner plates", "A hospital waiting list", "CPU scheduling round-robin"],
                "answer": 1,
                "explanation": "Dinner plates are stacked — you add to the top and remove from the top. Classic LIFO!"
            },
            {
                "q": "To reverse a string using a stack, you push all characters and then:",
                "options": ["Push again in reverse", "Pop all characters — they come out reversed", "Iterate the stack directly", "Use a second stack"],
                "answer": 1,
                "explanation": "Pushing all chars then popping produces them in reverse order — LIFO naturally reverses sequences."
            }
        ]
    },
    {
        "id": "bst",
        "title": "Binary Search Tree",
        "icon": "⬡",
        "color": "#00ff88",
        "iconBg": "rgba(0,255,136,0.12)",
        "difficulty": "medium",
        "desc": "Ordered tree: left < root < right. Efficient search and sort.",
        "learn": {
            "overview": "A <strong>Binary Search Tree (BST)</strong> is a tree where each node has at most 2 children, and for every node: all values in the left subtree are smaller, and all values in the right subtree are larger. This ordering property enables O(log n) search, insert, and delete on a balanced tree. Worst case (degenerate/skewed tree) degrades to O(n).",
            "useCases": "Database indexing, sorted data with frequent insertions/deletions, implementing sets/maps, range queries.",
            "complexity": [
                {"op": "Search (avg)", "val": "O(log n)"},
                {"op": "Insert (avg)", "val": "O(log n)"},
                {"op": "Delete (avg)", "val": "O(log n)"},
                {"op": "Worst case", "val": "O(n)"},
                {"op": "Space", "val": "O(n)"},
            ],
            "code": "class BST {\n  insert(root, val) {\n    if(!root) return { val, left:null, right:null };\n    if(val < root.val)\n      root.left = this.insert(root.left, val);\n    else if(val > root.val)\n      root.right = this.insert(root.right, val);\n    return root;\n  }\n  search(root, val) { // O(log n) avg\n    if(!root || root.val === val) return root;\n    return val < root.val\n      ? this.search(root.left, val)\n      : this.search(root.right, val);\n  }\n}",
            "vizType": "bst"
        },
        "quiz": [
            {
                "q": "In a BST, where are values smaller than the root stored?",
                "options": ["Right subtree", "Left subtree", "At the same level", "Root is always smallest"],
                "answer": 1,
                "explanation": "BST property: values less than the root go to the LEFT subtree; greater values go right."
            },
            {
                "q": "What traversal of a BST produces elements in sorted (ascending) order?",
                "options": ["Preorder", "Postorder", "Inorder", "Level-order"],
                "answer": 2,
                "explanation": "Inorder traversal (Left → Root → Right) of a BST visits nodes in ascending sorted order."
            },
            {
                "q": "A BST with nodes inserted in order 1,2,3,4,5 becomes:",
                "options": ["A balanced tree", "A right-skewed linear chain (worst case)", "A complete binary tree", "An AVL tree"],
                "answer": 1,
                "explanation": "Inserting sorted data creates a right-skewed tree — essentially a linked list, giving O(n) performance."
            },
            {
                "q": "Which self-balancing variant of BST guarantees O(log n) worst case?",
                "options": ["Treap", "Splay Tree", "AVL Tree / Red-Black Tree", "Min-Heap"],
                "answer": 2,
                "explanation": "AVL trees and Red-Black trees maintain balance automatically, guaranteeing O(log n) for all operations."
            }
        ]
    },
    {
        "id": "sorting",
        "title": "Sorting Algorithms",
        "icon": "⟨⟩",
        "color": "#ff4757",
        "iconBg": "rgba(255,71,87,0.12)",
        "difficulty": "medium",
        "desc": "Bubble, Merge, Quick — master the art of ordering.",
        "learn": {
            "overview": "Sorting algorithms arrange elements in order. <strong>Bubble Sort</strong> O(n²) — simple, compares adjacent pairs. <strong>Merge Sort</strong> O(n log n) — divide & conquer, stable, reliable. <strong>Quick Sort</strong> O(n log n) avg — fast in practice, pivot-based partitioning.",
            "useCases": "Database query results, UI list ordering, search preprocessing, event scheduling, file system organization.",
            "complexity": [
                {"op": "Bubble Sort", "val": "O(n²)"},
                {"op": "Merge Sort", "val": "O(n log n)"},
                {"op": "Quick Sort", "val": "O(n log n)"},
                {"op": "Heap Sort", "val": "O(n log n)"},
                {"op": "Counting Sort", "val": "O(n+k)"},
            ],
            "code": "// Merge Sort — O(n log n)\nfunction mergeSort(arr) {\n  if(arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const L = mergeSort(arr.slice(0, mid));\n  const R = mergeSort(arr.slice(mid));\n  return merge(L, R);\n}",
            "vizType": "sorting"
        },
        "quiz": [
            {
                "q": "What is the worst-case time complexity of Quick Sort?",
                "options": ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
                "answer": 2,
                "explanation": "When the pivot is always the smallest or largest element (sorted/reverse-sorted input), Quick Sort degrades to O(n²)."
            },
            {
                "q": "Which sorting algorithm is STABLE?",
                "options": ["Heap Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
                "answer": 2,
                "explanation": "Merge Sort is stable — equal elements maintain their original relative order."
            },
            {
                "q": "Counting Sort achieves O(n+k) time. What does 'k' represent?",
                "options": ["Number of comparisons", "The range of input values", "Stack depth", "Number of passes"],
                "answer": 1,
                "explanation": "k is the range of input values. Counting Sort counts occurrences across this range."
            },
            {
                "q": "Merge Sort uses _____ extra space.",
                "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                "answer": 2,
                "explanation": "Merge Sort requires O(n) auxiliary space for the temporary arrays used during merging."
            }
        ]
    },
    {
        "id": "graph",
        "title": "Graphs & BFS/DFS",
        "icon": "◎",
        "color": "#e056fd",
        "iconBg": "rgba(224,86,253,0.12)",
        "difficulty": "hard",
        "desc": "Networks of vertices and edges. BFS, DFS, and shortest paths.",
        "learn": {
            "overview": "A <strong>Graph</strong> G = (V, E) consists of vertices (nodes) and edges (connections). Graphs can be directed or undirected, weighted or unweighted. <strong>BFS</strong> (Breadth-First Search) explores level by level using a queue. <strong>DFS</strong> (Depth-First Search) explores as deep as possible using a stack/recursion.",
            "useCases": "Social networks, GPS navigation, web crawlers, dependency resolution, network routing, game AI pathfinding.",
            "complexity": [
                {"op": "BFS / DFS", "val": "O(V + E)"},
                {"op": "Dijkstra", "val": "O((V+E) log V)"},
                {"op": "Bellman-Ford", "val": "O(VE)"},
                {"op": "Floyd-Warshall", "val": "O(V³)"},
                {"op": "Space", "val": "O(V)"},
            ],
            "code": "// BFS — Queue based\nfunction bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  while(queue.length) {\n    const node = queue.shift();\n    process(node);\n    for(let nb of graph[node])\n      if(!visited.has(nb)) {\n        visited.add(nb);\n        queue.push(nb);\n      }\n  }\n}",
            "vizType": "graph"
        },
        "quiz": [
            {
                "q": "BFS uses a _____ while DFS uses a _____.",
                "options": ["Stack, Queue", "Queue, Stack", "Heap, Queue", "Array, Linked List"],
                "answer": 1,
                "explanation": "BFS uses a Queue (FIFO) for level-by-level exploration. DFS uses a Stack (LIFO) — either explicit or via recursion."
            },
            {
                "q": "Which algorithm finds the shortest path in an UNWEIGHTED graph?",
                "options": ["Dijkstra's Algorithm", "BFS", "DFS", "Bellman-Ford"],
                "answer": 1,
                "explanation": "BFS naturally finds the shortest path in unweighted graphs because it explores level by level."
            },
            {
                "q": "A directed graph with no cycles is called:",
                "options": ["Undirected Graph", "Complete Graph", "DAG (Directed Acyclic Graph)", "Bipartite Graph"],
                "answer": 2,
                "explanation": "A Directed Acyclic Graph (DAG) has directed edges and no cycles."
            },
            {
                "q": "What is the time complexity of BFS/DFS?",
                "options": ["O(V²)", "O(E log V)", "O(V + E)", "O(V × E)"],
                "answer": 2,
                "explanation": "BFS and DFS both visit every vertex and edge once, giving O(V + E) time complexity."
            }
        ]
    }
]

# --- SESSION STATE ---
if 'view' not in st.session_state:
    st.session_state.view = 'landing'
if 'selected_topic' not in st.session_state:
    st.session_state.selected_topic = None
if 'quiz_state' not in st.session_state:
    st.session_state.quiz_state = {}

# --- CSS ---
CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Exo+2:wght@300;400;500;600&display=swap');

:root {
  --bg-deep: #050a12;
  --bg-card: #0d1520;
  --bg-panel: #0a1825;
  --accent-cyan: #00f5ff;
  --accent-gold: #ffd700;
  --accent-violet: #9b59b6;
  --accent-green: #00ff88;
  --accent-red: #ff4757;
  --text-primary: #e8f4fd;
  --text-muted: #6a8fa8;
  --border-glow: rgba(0, 245, 255, 0.3);
  --shadow-neon: 0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.1);
}

.stApp {
    background: var(--bg-deep);
    color: var(--text-primary);
    font-family: 'Exo+2', sans-serif;
}

/* Hide Streamlit Header/Footer */
header, footer {visibility: hidden;}

/* Background Grid */
.bg-grid {
  position: fixed; inset: 0; z-index: -1;
  background-image:
    linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Custom Cards */
.card-container {
    perspective: 1000px;
    margin-bottom: 24px;
}
.card-inner {
    background: var(--bg-card);
    border: 1px solid rgba(0,245,255,0.15);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
    min-height: 250px;
    display: flex;
    flex-direction: column;
}
.card-inner:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-neon);
    border-color: var(--accent-cyan);
}
.card-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 16px;
}
.card-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem; font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
}
.card-desc {
    font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;
    flex-grow: 1;
}
.badge {
    display: inline-block; margin-top: 12px;
    padding: 2px 10px; border-radius: 12px;
    font-size: 0.65rem; font-weight: 600;
    text-transform: uppercase;
    width: fit-content;
}
.badge-easy   { background:rgba(0,255,136,0.15); color:var(--accent-green); border:1px solid rgba(0,255,136,0.3); }
.badge-medium { background:rgba(255,215,0,0.12); color:var(--accent-gold);  border:1px solid rgba(255,215,0,0.3); }
.badge-hard   { background:rgba(255,71,87,0.12);  color:var(--accent-red);   border:1px solid rgba(255,71,87,0.3); }

/* Hero Section */
.hero { text-align: center; padding: 60px 0; }
.hero h1 {
    font-family: 'Orbitron', monospace;
    font-size: 4rem; font-weight: 900;
    background: linear-gradient(135deg, #fff 0%, var(--accent-cyan) 50%, var(--accent-violet) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
}
.hero p { color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto; }

/* Complexity Table Style */
.complexity-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 15px 0; }
.complexity-chip {
    padding: 5px 12px; border-radius: 6px;
    font-size: 0.75rem; font-weight: 600;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(0,245,255,0.2);
    color: var(--text-primary);
}
.complexity-chip span { color: var(--accent-cyan); }

/* Back Button */
.back-btn {
    cursor: pointer;
    color: var(--accent-cyan);
    font-family: 'Orbitron', monospace;
    font-size: 0.9rem;
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 20px;
}

/* Quiz Styles */
.stRadio > div {
    background: var(--bg-card);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid rgba(0,245,255,0.1);
}
</style>
"""

st.markdown(CSS, unsafe_allow_html=True)
st.markdown('<div class="bg-grid"></div>', unsafe_allow_html=True)

# --- FUNCTIONS ---
def navigate_to(view, topic_id=None):
    st.session_state.view = view
    st.session_state.selected_topic = topic_id
    st.rerun()

def get_topic_by_id(tid):
    return next((t for t in DSA_TOPICS if t['id'] == tid), None)

# --- LANDING PAGE ---
if st.session_state.view == 'landing':
    # Hero
    st.markdown("""
    <div class="hero">
        <div style="color:var(--accent-gold); letter-spacing:4px; font-size:0.8rem; margin-bottom:10px;">DATA STRUCTURES & ALGORITHMS</div>
        <h1>Master DSA Visually</h1>
        <p>Interactive visualizations, step-by-step explanations, and quizzes — everything you need to truly understand DSA.</p>
    </div>
    """, unsafe_allow_html=True)

    # Topics Grid
    st.markdown('<div style="font-family:Orbitron; letter-spacing:4px; color:var(--accent-cyan); margin-bottom:30px;">TOPICS</div>', unsafe_allow_html=True)
    
    cols = st.columns(3)
    for i, topic in enumerate(DSA_TOPICS):
        with cols[i % 3]:
            st.markdown(f"""
            <div class="card-container">
                <div class="card-inner">
                    <div class="card-icon" style="background:{topic['iconBg']}; color:{topic['color']};">
                        {topic['icon']}
                    </div>
                    <div class="card-title">{topic['title']}</div>
                    <div class="card-desc">{topic['desc']}</div>
                    <div class="badge badge-{topic['difficulty']}">{topic['difficulty']}</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            if st.button(f"Explore {topic['title']}", key=f"btn-{topic['id']}", use_container_width=True):
                navigate_to('detail', topic['id'])

# --- DETAIL PAGE ---
else:
    topic = get_topic_by_id(st.session_state.selected_topic)
    if not topic:
        navigate_to('landing')

    # Back Button
    if st.button("← Back to Topics", key="back"):
        navigate_to('landing')

    st.markdown(f"""
    <div style="display:flex; align-items:center; gap:15px; margin-bottom:10px;">
        <div style="width:40px; height:40px; background:{topic['iconBg']}; color:{topic['color']}; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">{topic['icon']}</div>
        <h1 style="font-family:Orbitron; margin:0; color:var(--accent-cyan);">{topic['title']}</h1>
    </div>
    """, unsafe_allow_html=True)

    tab_learn, tab_demo, tab_quiz = st.tabs(["📚 Learn", "🎮 Demo", "📝 Quiz"])

    with tab_learn:
        st.markdown(f"### Overview")
        st.markdown(f"<div style='font-size:1.1rem; line-height:1.6; color:#ccc;'>{topic['learn']['overview']}</div>", unsafe_allow_html=True)
        
        st.markdown("### Complexity")
        chips = "".join([f'<div class="complexity-chip">{c["op"]}: <span>{c["val"]}</span></div>' for c in topic['learn']['complexity']])
        st.markdown(f'<div class="complexity-row">{chips}</div>', unsafe_allow_html=True)

        st.markdown("### Use Cases")
        st.info(topic['learn']['useCases'])

        st.markdown("### Implementation")
        st.code(topic['learn']['code'], language="javascript")

    with tab_demo:
        # We'll use the original JS visualizer logic in an iframe
        viz_html = f"""
        <style>
        {open('css/style.css').read() if i==0 else ""} /* We'll just embed the needed styles */
        body {{ background: transparent; color: #fff; font-family: 'Exo 2', sans-serif; padding: 20px; }}
        .viz-container {{ background: rgba(0,0,0,0.3); border: 1px solid rgba(0,245,255,0.1); border-radius: 12px; padding: 20px; }}
        </style>
        <div id="viz-root" class="viz-container"></div>
        <script>
        {open('js/visualizer.js').read()}
        const container = document.getElementById('viz-root');
        Viz.render('{topic['learn']['vizType']}', container);
        </script>
        """
        # Since I can't easily read local files into strings in this environment without multiple steps,
        # I'll embed a simplified version of the visualizer or just host the logic.
        # Let's try to bundle the necessary JS and CSS.
        
        # NOTE: In a real environment, I'd read style.css and visualizer.js.
        # Here I will construct a bundled HTML.
        
        bundle_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@400;600&display=swap">
            <style>
                :root {{
                    --bg-deep: #050a12; --bg-card: #0d1520; --bg-panel: #0a1825;
                    --accent-cyan: #00f5ff; --accent-gold: #ffd700; --accent-violet: #9b59b6;
                    --accent-green: #00ff88; --accent-red: #ff4757;
                    --text-primary: #e8f4fd; --text-muted: #6a8fa8;
                    --border-glow: rgba(0, 245, 255, 0.3);
                    --shadow-neon: 0 0 20px rgba(0, 245, 255, 0.4);
                }}
                body {{ background: transparent; color: var(--text-primary); font-family: 'Exo 2', sans-serif; margin: 0; overflow: hidden; }}
                {open('c:/Users/deysh/Desktop/dsa-learn/css/style.css').read()}
                .viz-container {{ background: rgba(0,0,0,0.5); border: 1px solid var(--border-glow); border-radius: 16px; padding: 30px; min-height: 400px; }}
            </style>
        </head>
        <body>
            <div id="viz-container" class="viz-container"></div>
            <script>
                {open('c:/Users/deysh/Desktop/dsa-learn/js/visualizer.js').read()}
                const root = document.getElementById('viz-container');
                Viz.render('{topic['learn']['vizType']}', root);
            </script>
        </body>
        </html>
        """
        components.html(bundle_html, height=500, scrolling=True)

    with tab_quiz:
        st.markdown("### Test Your Knowledge")
        
        for idx, q in enumerate(topic['quiz']):
            st.write(f"**Question {idx+1}:** {q['q']}")
            
            key = f"quiz_{topic['id']}_{idx}"
            user_choice = st.radio("Choose an option:", q['options'], key=key)
            
            if st.button(f"Check Answer {idx+1}", key=f"btn_check_{idx}"):
                choice_idx = q['options'].index(user_choice)
                if choice_idx == q['answer']:
                    st.success(f"Correct! {q['explanation']}")
                else:
                    st.error(f"Incorrect. {q['explanation']}")
            st.divider()

# --- FOOTER ---
st.markdown("""
<div style="position:fixed; bottom:0; left:0; right:0; background:rgba(5,10,18,0.9); padding:10px 30px; border-top:1px solid rgba(0,245,255,0.1); font-size:0.7rem; color:var(--text-muted); display:flex; justify-content:space-between;">
    <div>● System Online</div>
    <div style="color:var(--accent-cyan);">DSA.learn v1.0 — Interactive Learning Platform</div>
</div>
""", unsafe_allow_html=True)
