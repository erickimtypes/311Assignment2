// Class representing a single saying, which includes the saying in Hawaiian,
// its translation in English, and explanations in both languages.
class Saying {
    constructor(hawaiian, english, hawaiianExplanation, englishExplanation) {
        this.hawaiian = hawaiian;
        this.english = english;
        this.hawaiianExplanation = hawaiianExplanation;
        this.englishExplanation = englishExplanation;
    }
}

// Node class for Red-Black Tree, representing a node that contains a saying.
// Each node has references to left and right children, and a color (either RED or BLACK).
class Node {
    constructor(saying) {
        this.saying = saying; // Stores saying in node
        this.left = null;
        this.right = null;
        this.color = 'RED'; // Default color is red
    }
}

// Red-Black Tree class: this is the balanced tree that stores sayings and keeps them
// in alphabetical order by Hawaiian phrase. 
class RedBlackTree {
    constructor() {
        this.root = null; // Initialize the root of the tree as null (empty tree)
    }

    // Public method to insert a new saying into the tree.
    // This is the method that external code will use to add a new entry.
    insert(saying) {
        this.root = this._insert(this.root, new Node(saying));
        this.root.color = 'BLACK'; // Root must always be black
    }

    // Private method (shown by _) to recursively insert a node into the correct position in the tree.
    _insert(node, newNode) {
        // Base case: if we reach a null node, we have found the correct place to insert the new node.
        if(!node) return newNode;

        // Compare the Hawaiian sayings to maintain alphabetical order.
        if(newNode.saying.hawaiian < node.saying.hawaiian) {
            node.left = this._insert(node.left, newNode);
        } else if(newNode.saying.hawaiian > node.saying.hawaiian) {
            node.right = this._insert(node.right, newNode);
        } 
        
        // After inserting, we need to balance the tree
        node = this._balance(node);
        return node; // Return the node after balancing
    }

    // Private method to balance the tree after inserting a new node.
    _balance(node) {
        // Case 1: If the right child is red and the left child is black, perform a left rotation
        if (this._isRed(node.right) && !this._isRed(node.left)) {
            node = this._rotateLeft(node);
        }

        // Case 2: If the left child and its left child are red, perform a right rotation
        if (this._isRed(node.left) && this._isRed(node.left.left)) {
            node = this._rotateRight(node);
        }
    
        // Case 3: If both children are red, flip the colors
        if (this._isRed(node.left) && this._isRed(node.right)) {
            this._flipColors(node);
        }

        return node; // Return the balanced node
    }
    
    // Private method to perform left rotation
    _rotateLeft(node) {
        let rightChild = node.right;
        
        node.right = rightChild.left;
        rightChild.left = node;
        rightChild.color = node.color; // Inherit the color of the parent node
        node.color = 'RED'; // The original node becomes red after the rotation
        
        return rightChild; // Return the new root after rotation
    }
    
    // Private method to perform right rotation
    _rotateRight(node) {
        let leftChild = node.left;
        
        node.left = leftChild.right;
        leftChild.right = node;
        leftChild.color = node.color; // Inherit the color of the parent node
        node.color = 'RED'; // The original node becomes red after the rotation
        
        return leftChild; // Return the new root after rotation
    }

    // Private method to invert color on the node and its childrens'
    _flipColors(node) {
        node.color = 'RED';
        node.left.color = 'BLACK';
        node.right.color = 'BLACK';
    }

    // Private method to test for redness
    _isRed(node) {
        if (!node) return false; // Null nodes are considered black
        return node.color === 'RED'; // True if node is red
    }

    // Public method to check if a saying with a given Hawaiian phrase exists in the tree.
    member(hawaiian) {
        return !!this.search(hawaiian);
    }
    
    // Public method to search for a saying by its Hawaiian phrase.
    search(hawaiian) {
        return this._search(this.root, hawaiian);
    }

    // Private helper method
    _search(node, hawaiian) {
        // Base case: if we reach a null node, the saying is not in the tree.
        if(!node) return null;

        // Compare the Hawaiian sayings to find the correct node.
        if(hawaiian < node.saying.hawaiian) {
            return this._search(node.left, hawaiian); // Recursively search left subtree
        } else if(hawaiian > node.saying.hawaiian) {
            return this._search(node.right, hawaiian); // Recursively search right subtree
        } else {
            return node.saying; // Found the saying
        }
    }

    // Method to get the first saying in the tree (the leftmost node).
    first() {
        let node = this.root;
        while (node.left) {
            node = node.left; // Traverse to the leftmost node
        }
        return node.saying;
    }

    // Method to get the last saying in the tree (the rightmost node).
    last() {
        let node = this.root;
        while (node.right) {
            node = node.right; // Traverse to the rightmost node
        }
        return node.saying;
    }

    // Method to get the next smaller saying in the tree (the node with the next smaller Hawaiian phrase).
    predecessor(saying) {
        // Check if 'saying' is a Saying object or a string
        let hawaiian = typeof saying === 'object' && saying !== null ? saying.hawaiian : saying;

        let current = this.root;
        let predecessor = null;

        while (current) {
            if (hawaiian > current.saying.hawaiian) {
                predecessor = current; // Update predecessor if we move right
                current = current.right; // Move right to find larger predecessors
            } else {
                current = current.left; // Move left to find smaller nodes
            }
        }

        return predecessor ? predecessor.saying : null; // Return the saying or null if no predecessor
    }

    // Method to get the next larger saying in the tree (the node with the next larger Hawaiian phrase).
    successor(saying) {
        // Check if 'saying' is a Saying object or a string
        let hawaiian = typeof saying === 'object' && saying !== null ? saying.hawaiian : saying;

        let current = this.root;
        let successor = null;

        while (current) {
            if (hawaiian < current.saying.hawaiian) {
                successor = current; // Update successor if we move left
                current = current.left; // Move left to find smaller successors
            } else {
                current = current.right; // Move right to find larger nodes
            }
        }

        return successor ? successor.saying : null; // Return the saying or null if no successor
    }
}

/* Inverted Index class, which allows for efficient searching of sayings containing a specific word.
class InvertedIndex {
    constructor() {
        this.index = new Map(); // Initialize an empty map to store a word to sayings that contain that word
    }

    // Method to add a saying to the index
    addSaying(saying, isHawaiian) {
        // Split the saying into individual words, either from the Hawaiian or English text.

        // For each word in the saying, add it to the index.
    }

    // Search the index for sayings containing a specific word.
    search(word) {

    }
} */

// Map-based approach to store sayings by Hawaiian and English words
class SayingsMap {
    constructor() {
        this.hawaiianMap = new Map(); // Maps Hawaiian words to sayings
        this.englishMap = new Map();  // Maps English words to sayings
    }

    // Method to add a saying to both maps
    addSaying(saying) {
        this._addToMap(saying.hawaiian, saying, this.hawaiianMap);
        this._addToMap(saying.english, saying, this.englishMap);
    }

    // Helper method to add words to the map
    _addToMap(text, saying, map) {
        const words = text.split(/\s+/); // Split on spaces

        words.forEach(word => {
            if (!map.has(word)) {
                map.set(word, new Set());
            }
            map.get(word).add(saying);
        });
    }

    // Search for sayings that contain a specific Hawaiian word
    searchHawaiian(word) {
        return this.hawaiianMap.has(word) ? Array.from(this.hawaiianMap.get(word)) : [];
    }

    // Search for sayings that contain a specific English word
    searchEnglish(word) {
        return this.englishMap.has(word) ? Array.from(this.englishMap.get(word)) : [];
    }
}

class OleloDatabase{
    constructor() {
        this.tree = new RedBlackTree();
        this.map = new SayingsMap();
    }

    // Method to add a new saying to the database
    insert(saying) {
        this.tree.insert(saying);
        this.map.addSaying(saying);
    }

    // Method to check if a saying exists in the database by its hawaiian text
    member(hawaiian) {
        return this.tree.member(hawaiian); // returns true if the saying is found and false if not
    }

    // Method that returns the first saying in the database
    first() {
        return this.tree.first();
    }

    // Method that returns the last saying in the database
    last() {
        return this.tree.last();
    }

    // Method that returns the next smaller saying in the database
    predecessor(hawaiian) {
        return this.tree.predecessor(hawaiian);
    }

    // Method that returns the next larger saying in the database
    successor(hawaiian) {
        return this.tree.successor(hawaiian);
    }

    // returning all sayings whose non-English version contains the given non-English word
    MeHua(saying) {
        return this.map.searchHawaiian(saying);
    }

    // returning all sayings whose English translation contains the given English word
    WithWord(saying) {
        return this.map.searchEnglish(saying);
    }
}

// Test code
const db = new OleloDatabase();

// Add some sayings to the database
const saying1 = {
    hawaiian: "Aloha kekahi i kekahi",
    english: "Love one another"
};

const saying2 = {
    hawaiian: "I ka ʻōlelo no ke ola",
    english: "In language there is life"
};

db.insert(saying1);
db.insert(saying2);

// Test first and last 
console.log(db.first()); // Output: saying1 (first in Hawaiian alphabetical order)
console.log(db.last());  // Output: saying2 (last in Hawaiian alphabetical order)

// Test predecessor and successor
console.log(db.predecessor(saying2)); // Output: saying1 (predecessor of saying2)
console.log(db.successor(saying1)); // Output: saying2 (successor of saying1)

// Test search
console.log(db.MeHua("Aloha")); // Output: [saying1]
console.log(db.WithWord("language")); // Output: [saying2]
