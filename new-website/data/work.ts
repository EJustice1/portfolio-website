export interface WorkItem {
  title: string;
  org: string;
  date: string;
  description: string;
  tags: string[];
}

export interface ArchiveWorkItem {
  title: string;
  org: string;
  dates: string;
  description: string;
}

export interface ArchiveProjectItem {
  name: string;
  context: string;
  date: string;
  description: string;
}

function googleRoleDate(): string {
  return new Date() < new Date("2026-06-01")
    ? "Incoming · Jun 2026"
    : "Jun 2026 – present";
}

export function getSelectedWork(): WorkItem[] {
  return [
    {
      title: "Software Engineer",
      org: "Google YouTube",
      date: googleRoleDate(),
      description:
        "Backend infrastructure and LLM orchestration for YouTube Ask. C++ and Go.",
      tags: ["c++", "go", "distributed systems", "infrastructure"],
    },
    {
      title: "Machine Learning Researcher",
      org: "University of Michigan",
      date: "Nov 2025 – Mar 2026",
      description:
        "Focused on KV-cache management in LLM inference systems, working within the vLLM and LMCache codebases. The goal was improving prefill speed by implementing bidirectional loading with overlapping IO and compute. A100s and H100s, profiled with Nvidia Nsight.",
      tags: ["python", "vllm", "cuda", "llm inference"],
    },
    {
      title: "AI Engineering Intern",
      org: "PersistOS",
      date: "Aug – Nov 2025",
      description:
        "One of the first engineers at an agentic memory platform. Built the multimodal pipeline, a semantic caching layer that cut API response time by 99%, and the LLM-as-a-Judge testing suite to verify memory usage.",
      tags: ["python", "redis", "gcp", "llm"],
    },
    {
      title: "Heterogeneous Multi Agent Debate",
      org: "EECS 498 · ML Research",
      date: "Aug – Dec 2025",
      description:
        "Capstone research project on Heterogeneous Multi Agent Debate for LLM inference. Confidence based gating to avoid redundant debate, cutting total FLOPs by 40%. Identified syntactic determinism as a class of failure modes that makes the approach unsuitable for syntax heavy fields, but reduces hallucinations in factual retrieval.",
      tags: ["python", "pytorch", "vllm", "research"],
    },
  ];
}

export function getAllWork(): ArchiveWorkItem[] {
  return [
    {
      title: "Software Engineer",
      org: "Google YouTube",
      dates: googleRoleDate(),
      description:
        "Backend infrastructure for YouTube's conversational search product.",
    },
    {
      title: "Machine Learning Researcher",
      org: "University of Michigan",
      dates: "Nov 2025 – Mar 2026",
      description:
        "LLM inference optimization via KV-cache management using vLLM and LMCache.",
    },
    {
      title: "AI Engineering Intern",
      org: "PersistOS",
      dates: "Aug – Nov 2025",
      description:
        "Core infrastructure for an agentic memory platform. Multimodal pipeline, semantic caching, LLM eval framework.",
    },
    {
      title: "Software Engineering Intern",
      org: "Little Caesars Pizza",
      dates: "May – Aug 2025",
      description:
        "Backend development and DevOps automation for enterprise systems serving 5,000+ franchise locations.",
    },
    {
      title: "Research Assistant",
      org: "University of Michigan · Interactive Sensing and Computing Lab",
      dates: "Sep – Dec 2024",
      description:
        "Embedded ML for real-time user activity sensing and identification.",
    },
    {
      title: "Software Development Intern",
      org: "United Wholesale Mortgage",
      dates: "May – Aug 2024",
      description:
        "Full-stack modernization of internal employee rewards platforms used by 750+ team leads.",
    },
    {
      title: "Flight Systems Developer",
      org: "M-Fly Aero Design",
      dates: "Sep 2023 – Sep 2024",
      description:
        "Autonomous navigation software for competition planes using ROS and MAVLink.",
    },
    {
      title: "Lead Programmer",
      org: "Hartland Robotics · FRC Team 3536",
      dates: "Jun 2019 – Jun 2023",
      description:
        "Architected software for four competitive robots. Custom sensor fusion, Hermite spline pathing, swerve drive control, computer vision turret tracking.",
    },
  ];
}

export const allProjects: ArchiveProjectItem[] = [
  {
    name: "Efficient Heterogeneous LLM Multi-Agent Debate (MAD)",
    context: "EECS 498 — ML Research",
    date: "Aug – Dec 2025",
    description:
      "Framework reducing inference costs 40% via confidence-based gating across heterogeneous agent configurations.",
  },
  {
    name: "Cycle-Accurate Processor Simulator",
    context: "EECS 370 — Computer Organization",
    date: "Oct – Dec 2025",
    description:
      "5-stage pipelined CPU simulator with configurable cache hierarchy, hazard detection, and forwarding.",
  },
  {
    name: "LC-2K Compilation Toolchain",
    context: "EECS 370 — Computer Organization",
    date: "Sep – Oct 2025",
    description:
      "End-to-end assembler and linker converting LC-2K assembly to executable machine binaries.",
  },
  {
    name: "Information Digest",
    context: "personal project",
    date: "Aug 2025",
    description:
      "Agentic information retrieval pipeline with Terraform-based IaC, LLM query decomposition, and CI/CD automation.",
  },
  {
    name: "Multi-Threaded Network File Server",
    context: "EECS 482 — Operating Systems",
    date: "Nov – Dec 2024",
    description:
      "Concurrent file server with reader/writer locks and crash-consistent disk logging.",
  },
  {
    name: "Virtual Memory Pager",
    context: "EECS 482 — Operating Systems",
    date: "Oct – Nov 2024",
    description:
      "External pager with clock page replacement, copy-on-write optimization, and swap-backed page management.",
  },
  {
    name: "The Situation Room",
    context: "Cal Hacks",
    date: "Oct 2024",
    description:
      "Unity simulation game using AI for dialogue analysis in de-escalation training scenarios.",
  },
  {
    name: "Ribbet",
    context: "MHacks",
    date: "Oct 2024",
    description:
      "Cross-platform social media app with betting mechanics, built on MERN stack.",
  },
  {
    name: "User-Level Thread Library",
    context: "EECS 482 — Operating Systems",
    date: "Sep – Oct 2024",
    description:
      "Threading library with context switching, synchronization primitives, and preemptive scheduling.",
  },
  {
    name: "Deep Metric Learning for Facial Recognition",
    context: "EECS 442 — Computer Vision",
    date: "Mar – Apr 2025",
    description:
      "ResNet-18 with non-parametric instance discrimination, contrastive loss, and memory bank feature vectors.",
  },
  {
    name: "Interview Bot Pro",
    context: "EECS 487 — NLP",
    date: "Feb – Mar 2025",
    description:
      "AI interview practice with Random Forest voice prosody analysis and LLM-based grading.",
  },
  {
    name: "Multi-Resolution Image Blending",
    context: "EECS 442 — Computer Vision",
    date: "Feb 2025",
    description:
      "Seamless image blending engine using Gaussian and Laplacian pyramids.",
  },
  {
    name: "Steerable Filter Edge Detection",
    context: "EECS 442 — Computer Vision",
    date: "Jan – Feb 2025",
    description:
      "Edge detection using gradient filters and steerable convolution.",
  },
  {
    name: "Inner Voice AI",
    context: "personal project",
    date: "Jul 2024",
    description:
      "Conversational AI therapist. 1st place at Stemist Hacks.",
  },
];
