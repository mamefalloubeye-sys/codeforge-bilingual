import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  // Python Exercises
  {
    id: 'python-hello-world',
    language: 'python',
    title: {
      fr: 'Hello World en Python',
      en: 'Hello World in Python',
    },
    description: {
      fr: 'Écrivez un programme qui affiche "Hello, World!" dans la console.',
      en: 'Write a program that prints "Hello, World!" to the console.',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: '# Écrivez votre code ici\n\n',
    solution: 'print("Hello, World!")',
    expectedOutput: 'Hello, World!',
    hints: {
      fr: ['Utilisez la fonction print()', 'N\'oubliez pas les guillemets autour du texte'],
      en: ['Use the print() function', 'Don\'t forget quotes around the text'],
    },
    explanation: {
      fr: 'La fonction print() affiche du texte dans la console. Les chaînes de caractères doivent être entourées de guillemets.',
      en: 'The print() function displays text in the console. Strings must be surrounded by quotes.',
    },
    order: 1,
  },
  {
    id: 'python-variables',
    language: 'python',
    title: {
      fr: 'Variables et Types',
      en: 'Variables and Types',
    },
    description: {
      fr: 'Créez une variable "age" avec la valeur 25 et affichez-la.',
      en: 'Create a variable "age" with value 25 and print it.',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: '# Créez la variable age et affichez-la\n\n',
    solution: 'age = 25\nprint(age)',
    expectedOutput: '25',
    hints: {
      fr: ['Utilisez le signe = pour assigner une valeur', 'Pas besoin de déclarer le type en Python'],
      en: ['Use the = sign to assign a value', 'No need to declare the type in Python'],
    },
    explanation: {
      fr: 'En Python, les variables sont créées automatiquement lors de l\'assignation. Le type est inféré automatiquement.',
      en: 'In Python, variables are created automatically during assignment. The type is inferred automatically.',
    },
    order: 2,
  },
  {
    id: 'python-class-intro',
    language: 'python',
    title: {
      fr: 'Introduction aux Classes (POO)',
      en: 'Introduction to Classes (OOP)',
    },
    description: {
      fr: 'Créez une classe "Voiture" avec un attribut "marque" et une méthode "demarrer()" qui affiche "La voiture démarre".',
      en: 'Create a "Car" class with a "brand" attribute and a "start()" method that prints "The car starts".',
    },
    difficulty: 'medium',
    category: 'oop',
    starterCode: '# Définissez la classe Voiture\nclass Voiture:\n    pass\n\n# Créez une instance et appelez demarrer()\n',
    solution: 'class Voiture:\n    def __init__(self, marque):\n        self.marque = marque\n    \n    def demarrer(self):\n        print("La voiture démarre")\n\nma_voiture = Voiture("Toyota")\nma_voiture.demarrer()',
    expectedOutput: 'La voiture démarre',
    hints: {
      fr: ['Utilisez __init__ pour le constructeur', 'self représente l\'instance actuelle', 'Définissez demarrer comme une méthode'],
      en: ['Use __init__ for the constructor', 'self represents the current instance', 'Define start as a method'],
    },
    explanation: {
      fr: 'Les classes en Python utilisent __init__ comme constructeur. self est une référence à l\'instance courante et doit être le premier paramètre de chaque méthode.',
      en: 'Python classes use __init__ as the constructor. self is a reference to the current instance and must be the first parameter of each method.',
    },
    order: 3,
  },
  {
    id: 'python-inheritance',
    language: 'python',
    title: {
      fr: 'Héritage en Python',
      en: 'Inheritance in Python',
    },
    description: {
      fr: 'Créez une classe "Animal" avec une méthode "parler()" et une classe "Chien" qui hérite d\'Animal et redéfinit "parler()" pour afficher "Wouf!".',
      en: 'Create an "Animal" class with a "speak()" method and a "Dog" class that inherits from Animal and overrides "speak()" to print "Woof!".',
    },
    difficulty: 'medium',
    category: 'oop',
    starterCode: '# Créez les classes Animal et Chien\n\n',
    solution: 'class Animal:\n    def parler(self):\n        print("...")\n\nclass Chien(Animal):\n    def parler(self):\n        print("Wouf!")\n\nmon_chien = Chien()\nmon_chien.parler()',
    expectedOutput: 'Wouf!',
    hints: {
      fr: ['Utilisez la syntaxe class Enfant(Parent):', 'Redéfinissez la méthode dans la classe enfant'],
      en: ['Use the syntax class Child(Parent):', 'Override the method in the child class'],
    },
    explanation: {
      fr: 'L\'héritage permet de créer une nouvelle classe basée sur une classe existante. La classe enfant peut redéfinir les méthodes de la classe parent.',
      en: 'Inheritance allows creating a new class based on an existing one. The child class can override methods from the parent class.',
    },
    order: 4,
  },

  // C Exercises
  {
    id: 'c-hello-world',
    language: 'c',
    title: {
      fr: 'Hello World en C',
      en: 'Hello World in C',
    },
    description: {
      fr: 'Écrivez un programme C qui affiche "Hello, World!".',
      en: 'Write a C program that prints "Hello, World!".',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Votre code ici\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    expectedOutput: 'Hello, World!',
    hints: {
      fr: ['Utilisez printf() pour afficher', 'N\'oubliez pas le \\n pour le saut de ligne'],
      en: ['Use printf() to display', 'Don\'t forget \\n for newline'],
    },
    explanation: {
      fr: 'En C, printf() est la fonction standard pour afficher du texte. Elle fait partie de la bibliothèque stdio.h.',
      en: 'In C, printf() is the standard function to display text. It is part of the stdio.h library.',
    },
    order: 1,
  },
  {
    id: 'c-pointers',
    language: 'c',
    title: {
      fr: 'Introduction aux Pointeurs',
      en: 'Introduction to Pointers',
    },
    description: {
      fr: 'Créez un pointeur vers un entier, assignez-lui une valeur via le pointeur, et affichez la valeur.',
      en: 'Create a pointer to an integer, assign it a value through the pointer, and print the value.',
    },
    difficulty: 'medium',
    category: 'pointers',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int nombre = 0;\n    // Créez un pointeur et modifiez nombre\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int nombre = 0;\n    int *ptr = &nombre;\n    *ptr = 42;\n    printf("%d\\n", nombre);\n    return 0;\n}',
    expectedOutput: '42',
    hints: {
      fr: ['Utilisez & pour obtenir l\'adresse', 'Utilisez * pour déréférencer le pointeur'],
      en: ['Use & to get the address', 'Use * to dereference the pointer'],
    },
    explanation: {
      fr: 'Les pointeurs stockent des adresses mémoire. & donne l\'adresse d\'une variable, et * accède à la valeur à cette adresse.',
      en: 'Pointers store memory addresses. & gives the address of a variable, and * accesses the value at that address.',
    },
    order: 2,
  },

  // Rust Exercises
  {
    id: 'rust-hello-world',
    language: 'rust',
    title: {
      fr: 'Hello World en Rust',
      en: 'Hello World in Rust',
    },
    description: {
      fr: 'Écrivez un programme Rust qui affiche "Hello, World!".',
      en: 'Write a Rust program that prints "Hello, World!".',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: 'fn main() {\n    // Votre code ici\n    \n}',
    solution: 'fn main() {\n    println!("Hello, World!");\n}',
    expectedOutput: 'Hello, World!',
    hints: {
      fr: ['Utilisez la macro println!()', 'Les macros en Rust se terminent par !'],
      en: ['Use the println!() macro', 'Macros in Rust end with !'],
    },
    explanation: {
      fr: 'println! est une macro Rust qui affiche du texte avec un saut de ligne. Les macros sont identifiées par le ! à la fin.',
      en: 'println! is a Rust macro that prints text with a newline. Macros are identified by the ! at the end.',
    },
    order: 1,
  },
  {
    id: 'rust-ownership',
    language: 'rust',
    title: {
      fr: 'Ownership et Borrowing',
      en: 'Ownership and Borrowing',
    },
    description: {
      fr: 'Créez une String, passez-la à une fonction par référence, et affichez-la après l\'appel.',
      en: 'Create a String, pass it to a function by reference, and print it after the call.',
    },
    difficulty: 'medium',
    category: 'ownership',
    starterCode: 'fn afficher(s: /* type ici */) {\n    println!("{}", s);\n}\n\nfn main() {\n    let message = String::from("Bonjour!");\n    // Appelez afficher et affichez message après\n    \n}',
    solution: 'fn afficher(s: &String) {\n    println!("{}", s);\n}\n\nfn main() {\n    let message = String::from("Bonjour!");\n    afficher(&message);\n    println!("{}", message);\n}',
    expectedOutput: 'Bonjour!\nBonjour!',
    hints: {
      fr: ['Utilisez & pour créer une référence', 'Le type sera &String'],
      en: ['Use & to create a reference', 'The type will be &String'],
    },
    explanation: {
      fr: 'Le borrowing permet d\'utiliser une valeur sans en prendre possession. Les références (&) permettent de passer des valeurs sans transférer l\'ownership.',
      en: 'Borrowing allows using a value without taking ownership. References (&) allow passing values without transferring ownership.',
    },
    order: 2,
  },

  // LaTeX Exercises
  {
    id: 'latex-document',
    language: 'latex',
    title: {
      fr: 'Document LaTeX de base',
      en: 'Basic LaTeX Document',
    },
    description: {
      fr: 'Créez un document LaTeX simple avec un titre "Mon Document" et un paragraphe.',
      en: 'Create a simple LaTeX document with the title "My Document" and a paragraph.',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: '% Créez votre document LaTeX\n\n',
    solution: '\\documentclass{article}\n\\begin{document}\n\\title{Mon Document}\n\\maketitle\nCeci est mon premier document LaTeX.\n\\end{document}',
    expectedOutput: '[Document LaTeX compilé]',
    hints: {
      fr: ['Commencez par \\documentclass', 'Utilisez \\begin{document} et \\end{document}'],
      en: ['Start with \\documentclass', 'Use \\begin{document} and \\end{document}'],
    },
    explanation: {
      fr: 'Un document LaTeX commence par \\documentclass et le contenu est entre \\begin{document} et \\end{document}.',
      en: 'A LaTeX document starts with \\documentclass and content goes between \\begin{document} and \\end{document}.',
    },
    order: 1,
  },

  // Scilab Exercises
  {
    id: 'scilab-matrix',
    language: 'scilab',
    title: {
      fr: 'Matrices en Scilab',
      en: 'Matrices in Scilab',
    },
    description: {
      fr: 'Créez une matrice 3x3 et calculez son déterminant.',
      en: 'Create a 3x3 matrix and calculate its determinant.',
    },
    difficulty: 'easy',
    category: 'basics',
    starterCode: '// Créez votre matrice et calculez le déterminant\n\n',
    solution: 'A = [1 2 3; 4 5 6; 7 8 9];\ndisp(det(A));',
    expectedOutput: '0',
    hints: {
      fr: ['Utilisez [ ] pour définir une matrice', 'La fonction det() calcule le déterminant'],
      en: ['Use [ ] to define a matrix', 'The det() function calculates the determinant'],
    },
    explanation: {
      fr: 'En Scilab, les matrices sont définies avec des crochets. Les points-virgules séparent les lignes.',
      en: 'In Scilab, matrices are defined with brackets. Semicolons separate rows.',
    },
    order: 1,
  },

  // Robotics & AI Exercises
  {
    id: 'robotics-ros-node',
    language: 'robotics',
    title: {
      fr: 'Nœud ROS de base',
      en: 'Basic ROS Node',
    },
    description: {
      fr: 'Créez un nœud ROS Python qui publie un message "Hello Robot" toutes les secondes.',
      en: 'Create a ROS Python node that publishes "Hello Robot" every second.',
    },
    difficulty: 'medium',
    category: 'ros',
    starterCode: '#!/usr/bin/env python\nimport rospy\nfrom std_msgs.msg import String\n\n# Créez votre nœud ROS\n',
    solution: '#!/usr/bin/env python\nimport rospy\nfrom std_msgs.msg import String\n\ndef talker():\n    pub = rospy.Publisher("chatter", String, queue_size=10)\n    rospy.init_node("talker", anonymous=True)\n    rate = rospy.Rate(1)\n    while not rospy.is_shutdown():\n        pub.publish("Hello Robot")\n        rate.sleep()\n\nif __name__ == "__main__":\n    talker()',
    expectedOutput: '[Publishing: Hello Robot]',
    hints: {
      fr: ['Utilisez rospy.init_node() pour initialiser', 'Créez un Publisher pour envoyer des messages'],
      en: ['Use rospy.init_node() to initialize', 'Create a Publisher to send messages'],
    },
    explanation: {
      fr: 'Les nœuds ROS communiquent via des topics. Un Publisher envoie des messages et un Subscriber les reçoit.',
      en: 'ROS nodes communicate via topics. A Publisher sends messages and a Subscriber receives them.',
    },
    order: 1,
  },
];

export function getExercisesByLanguage(language: string): Exercise[] {
  return exercises.filter(e => e.language === language).sort((a, b) => a.order - b.order);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}
