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
        node = _.balance(node);
        return node; // Return the node after balancing
    }

    // Private method to balance the tree after inserting a new node.
    _balance(node) {

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
    predecessor(hawaiian) {

    }

    // Method to get the next larger saying in the tree (the node with the next larger Hawaiian phrase).
    successor(hawaiian) {

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
