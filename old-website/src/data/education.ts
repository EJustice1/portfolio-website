import { Institution } from "@/types";

export const education: Institution[] = [
  {
    id: "umich",
    name: "University of Michigan",
    degree: "Bachelor of Science in Engineering",
    major: "Computer Science",
    period: {
      start: "2023-08",
      end: "2026-05",
    },
    location: "Ann Arbor, Michigan",
    honors: [
      "Dean's List",
      "University Honors",
      "Michigander EV and Mobility Scholar",
      "Undergraduate Research Opportunity Program"
    ],
    activities: ["M-Fly Aero Design", "Michigan Hackers", "Claude Builder's Club"],
    courseCategories: [
      {
        id: "cs",
        name: "Computer Science",
        courses: [
          {
            id: "eecs491",
            code: "EECS 491",
            name: "Distributed Systems",
            semester: "Winter 2026",
            isCurrent: true,
            skills: ["Distributed Systems", "Consensus Algorithms", "Fault Tolerance"],
            description: "EECS 491 explores the design and implementation of systems that operate across multiple networked computers to achieve scalability, performance, and fault tolerance. The course builds upon operating systems concepts to cover fundamental distributed computing abstractions, including remote procedure calls, distributed file systems, and consistent state management. Students examine the challenges of unreliable networks and component failures, learning techniques such as primary-backup replication and consensus algorithms like Paxos and Raft. Through practical projects often implemented in Go, the curriculum applies these theories to build robust applications like MapReduce frameworks and sharded key-value stores, mirroring real-world infrastructure used by major tech companies.",
          },
          {
            id: "eecs471",
            code: "EECS 471",
            name: "Advanced GPU Programming",
            semester: "Winter 2026",
            isCurrent: true,
            skills: ["CUDA", "GPU Architecture", "Parallel Computing"],
            description: "EECS 471 introduces the principles of massive parallel computing using GPUs to accelerate computationally intensive applications.The course focuses on the CUDA programming model and examines the underlying GPU architecture, teaching students how to map complex algorithms onto parallel hardware while managing memory hierarchies and thread execution. Key topics include fundamental parallel patterns like reduction, prefix scan, and matrix multiplication, along with optimization strategies such as memory coalescing and minimizing control divergence. Through a series of hands-on projects, students apply these techniques to build high-performance software for domains like machine learning, computer vision, and scientific computing.",
          },
          {
            id: "eecs482",
            code: "EECS 482",
            name: "Operating Systems",
            skills: ["C++", "Systems Programming", "Threading", "Memory Management"],
            description: "EECS 482 provides a deep dive into the software that manages computer hardware and supports application execution, focusing on the fundamental abstractions of modern operating systems. The course centers on three core concepts: concurrency, virtualization, and persistence. Students encounter the challenges of multi-threaded programming, learning to manage shared state and avoid race conditions using synchronization primitives like locks, condition variables, and semaphores. The curriculum explains how the OS virtualizes resources through memory management techniques like paging and CPU scheduling, while also covering file system design for data storage. Through rigorous projects typically coded in C++, students build essential system components, such as a user-level thread library, a virtual memory pager, and a multi-threaded file server.",
          },
          {
            id: "eecs498-ml",
            code: "EECS 498",
            name: "Machine Learning Research",
            skills: ["PyTorch", "HuggingFace", "LLMs", "Multi-Agent Systems"],
            description: "EECS 498 introduces undergraduate students to the formal research process within the field of artificial intelligence, bridging the gap between standard coursework and independent academic inquiry. The course guides students through the entire research lifecycle, starting with conducting extensive literature surveys to identify open problems and understanding state-of-the-art methods. Students are tasked with selecting a relevant machine learning paper to replicate, verifying its results through their own technical implementation, and then proposing and executing novel extensions to the work. In addition to technical skills in frameworks like PyTorch, the curriculum emphasizes research communication, requiring students to document their findings in written reports and deliver oral presentations similar to those at academic conferences.",
          },
          {
            id: "eecs487",
            code: "EECS 487",
            name: "Natural Language Processing",
            skills: ["NLP", "Transformers", "Language Models", "Text Processing"],
            description: "EECS 487 examines the computational methods used to enable computers to understand, interpret, and generate human language. The course bridges linguistics and machine learning, starting with fundamental statistical techniques like n-gram language models and text classification before advancing to modern deep learning approaches. Students explore how to represent words mathematically using embeddings and implement neural network architectures, including Recurrent Neural Networks and Transformers, to handle complex sequence data. Key topics cover essential tasks such as sentiment analysis, part-of-speech tagging, machine translation, and question answering. Through practical assignments, typically in Python, students apply these algorithms to build systems capable of processing and analyzing real-world text data.",
          },
          {
            id: "eecs442",
            code: "EECS 442",
            name: "Computer Vision",
            skills: ["Computer Vision", "Deep Learning", "Image Processing", "CNNs"],
            description: "EECS 442 investigates the computational theories and algorithms that enable computers to perceive and understand visual information. The course bridges classical techniques and modern deep learning, starting with the fundamentals of image formation, filtering, and feature detection to extract structure from pixel data. Students explore the geometry of 3D vision, covering camera models, stereo vision, and motion analysis to reconstruct scenes from two-dimensional images. A significant portion of the curriculum is dedicated to data-driven approaches, focusing on the design and training of Convolutional Neural Networks (CNNs) for high-level tasks like image classification, object detection, and semantic segmentation. Through programming assignments typically using Python and PyTorch, students build and test these models to solve real-world visual recognition challenges.",
          },
          {
            id: "eecs376",
            code: "EECS 376",
            name: "Foundations of Computer Science",
            skills: ["Algorithms", "Complexity Theory", "Proofs", "Automata"],
            description: "EECS 376 establishes the mathematical framework that defines the capabilities and limitations of computers. The course focuses on the theory of computation, teaching students how to classify problems based on their difficulty and how to design efficient algorithms to solve them. Key topics include computational complexity, where students explore the distinction between tractable and intractable problems through concepts like P vs NP and NP-completeness. The curriculum also investigates the absolute boundaries of what can be computed, covering undecidability and the Halting Problem, alongside applied theoretical areas such as cryptography and randomized algorithms. Emphasis is placed on rigorous logical reasoning, requiring students to write mathematical proofs to verify algorithm correctness and determine the feasibility of computational tasks.",
          },
          {
            id: "eecs370",
            code: "EECS 370",
            name: "Computer Organization",
            skills: ["Assembly", "Computer Architecture", "Pipeline", "Memory Hierarchy"],
            description: "EECS 370 serves as the bridge between high-level software and low-level hardware, explaining how computer programs actually execute on silicon. The course explores the translation of code, guiding students through the process of converting C programs into assembly language and binary machine code using a specific Instruction Set Architecture (ISA). A significant portion of the curriculum focuses on processor design, where students learn to construct the datapath and control logic of a CPU, progressing from simple single-cycle implementations to high-performance pipelined processors that manage execution hazards. The course also details the memory hierarchy, examining how caches and virtual memory systems are structured to optimize data access speeds. Through a series of projects, students write assemblers and build software simulators to verify the logic and performance of their processor designs.",
          },
          {
            id: "eecs281",
            code: "EECS 281",
            name: "Data Structures and Algorithms",
            skills: ["C++", "Data Structures", "Algorithms", "Complexity Analysis"],
            description: "EECS 281 serves as a foundational course in computer science, teaching students how to select and implement appropriate data structures and algorithms to solve computational problems efficiently. The curriculum covers essential abstract data types including stacks, queues, priority queues, and hash tables, as well as advanced structures like balanced binary search trees and graphs. Students learn to analyze code performance using Big-O notation and apply algorithm design paradigms such as divide-and-conquer, greedy strategies, and dynamic programming. Through a series of rigorous projects implemented in C++, students gain practical experience in managing memory and optimizing execution speed, often tackling complex tasks like pathfinding or data compression under strict time and memory constraints.",
          },
          {
            id: "eecs280",
            code: "EECS 280",
            name: "Intro to Data Structures",
            skills: ["C++", "OOP", "Testing", "Recursion"],
            description: "EECS 280 focuses on algorithm development and programming techniques using C++, emphasizing how data is structured and managed in memory. The course teaches the fundamentals of memory management, requiring students to master pointers, dynamic allocation on the heap, and the mechanics of deep versus shallow copying. Students learn to implement and utilize core data structures like linked lists and dynamic arrays, treating them as Abstract Data Types (ADTs) to solve specific problems. The curriculum also covers recursion as a primary logic tool and explores object-oriented programming concepts such as inheritance, polymorphism, and virtual functions. Through rigorous coding projects, students apply these principles to build command-line applications that involve file processing and custom data organization.",
          },
        ],
      },
      {
        id: "data-science",
        name: "Data Science",
        courses: [
          {
            id: "stats401",
            code: "STATS 401",
            name: "Applied Statistical Methods II",
            skills: ["Regression", "Statistical Inference", "R"],
            description: "STATS 401 serves as an intermediate course in statistical analysis, focusing on the methods used to model relationships between variables and draw inferences from data. The curriculum centers on the theory and application of linear regression and Analysis of Variance (ANOVA), guiding students through the process of constructing, validating, and interpreting complex statistical models. Key topics include multiple regression, model selection strategies, variable transformations, and diagnostic techniques to assess model fit using residual analysis. A significant component of the course involves the use of statistical software, typically R, to perform computations and visualize findings. Through data-driven assignments, students learn to translate raw datasets into mathematical models to solve practical problems across various scientific and social domains.",
          },
          {
            id: "stats306",
            code: "STATS 306",
            name: "Statistical Computing",
            skills: ["R", "Data Manipulation", "Visualization", "Tidyverse"],
            description: "STATS 306 introduces the computational foundations required for statistics and data science, focusing extensively on the R programming language and its application to data analysis. The course covers the entire data pipeline, teaching students how to import, clean, and manipulate complex datasets using the Tidyverse suite of tools, as well as how to create expressive data visualizations with ggplot2. The curriculum emphasizes essential programming concepts, including writing custom functions, understanding vectorization, and managing control flow, while also introducing version control systems like Git for collaborative work. Through hands-on labs and projects, students apply these technical skills to perform exploratory data analysis and implement basic statistical models, effectively bridging the gap between raw data and interpretable insights.",
          },
          {
            id: "stats250",
            code: "STATS 250",
            name: "Introduction to Statistics and Data Analysis",
            skills: ["Statistics", "Hypothesis Testing", "Probability"],
            description: "STATS 250 provides a broad introduction to the principles of statistical reasoning and data analysis. The course covers the full process of statistical inquiry, starting with data collection methods such as sampling and experimental design, followed by techniques for summarizing and visualizing data using graphs and numerical measures. Students explore the foundations of probability to understand uncertainty, leading into the core concepts of statistical inference, including sampling distributions, confidence intervals, and hypothesis testing. The curriculum examines various analytical tools, such as t-tests, analysis of variance (ANOVA), chi-square tests, and linear regression, to make decisions based on data. Through regular lab sessions, students use statistical software like R to apply these methods to real-world datasets, developing the skills to interpret and communicate quantitative findings.",
          },
        ],
      },
      {
        id: "math",
        name: "Math",
        courses: [
          {
            id: "math215",
            code: "MATH 215",
            name: "Calculus III",
            skills: ["Multivariable Calculus", "Vector Calculus"],
            description: "MATH 215 extends the fundamental concepts of calculus into three-dimensional space, providing the mathematical tools necessary to analyze systems with multiple variables. The course begins with the geometry of Euclidean space, covering vectors, dot and cross products, and the equations of lines and planes. Students learn to manipulate multivariable functions through partial differentiation, exploring concepts such as the gradient vector, tangent planes, and optimization techniques like Lagrange multipliers. The curriculum then advances to integration in higher dimensions, including double and triple integrals in various coordinate systems. The final portion of the course focuses on vector calculus, connecting line and surface integrals through fundamental theorems such as Green's Theorem, Stokes' Theorem, and the Divergence Theorem, which are essential for describing physical phenomena like fluid flow and electromagnetic fields.",
          },
          {
            id: "rob101",
            code: "ROB 101",
            name: "Computational Linear Algebra",
            skills: ["Linear Algebra", "Julia", "Matrix Operations"],
            description: "ROB 101 introduces linear algebra through a computational lens, prioritizing the algorithms used to solve mathematical problems over traditional manual calculations. The course teaches students to implement mathematical concepts using high-level programming languages like Julia, enabling them to handle large datasets and complex operations that are infeasible by hand. The curriculum covers the foundations of vector spaces and matrix algebra, focusing on solving systems of linear equations (Ax=b) and understanding essential matrix factorizations such as LU and QR decompositions. A significant portion of the course is dedicated to optimization and data fitting using the method of least squares. Through practical coding assignments, students apply these techniques to real engineering challenges, building the necessary mathematical toolkit for fields like robotics, computer vision, and machine learning.",
          },
          {
            id: "eecs203",
            code: "EECS 203",
            name: "Discrete Math",
            skills: ["Logic", "Set Theory", "Graph Theory", "Combinatorics"],
            description: "EECS 203 covers the mathematical foundations essential for computer science, focusing on discrete structures rather than continuous calculus. The course emphasizes the art of mathematical reasoning, teaching students how to construct valid arguments through propositional logic and various proof techniques, including mathematical induction. The curriculum explores core topics such as set theory, functions, and number theory, which provide the basis for cryptography and algorithm analysis. Students also delve into combinatorics and discrete probability to solve complex counting problems, alongside an introduction to graph theory for modeling network relationships. By mastering these concepts, students gain the analytical tools necessary for understanding data structures and designing efficient software systems.",
          },
        ],
      },
    ],
  },
];
