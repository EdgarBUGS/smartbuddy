import type { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'photosynthesis',
    title: 'Photosynthesis Fundamentals',
    description: 'Test your knowledge on how plants create their own food.',
    topic: 'Biology',
    questions: [
      {
        text: 'What is the primary pigment used in photosynthesis?',
        options: ['Chlorophyll', 'Carotene', 'Xanthophyll', 'Anthocyanin'],
        correctAnswer: 0,
        difficulty: 1,
      },
      {
        text: 'What are the two main products of photosynthesis?',
        options: [
          'Water and Carbon Dioxide',
          'Glucose and Oxygen',
          'Sunlight and Water',
          'Oxygen and Carbon Dioxide',
        ],
        correctAnswer: 1,
        difficulty: 1,
      },
      {
        text: 'Where in the plant cell does photosynthesis take place?',
        options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
        correctAnswer: 2,
        difficulty: 1,
      },
      {
        text: "The light-dependent reactions of photosynthesis produce ATP and what other molecule?",
        options: ['NADPH', 'NADH', 'FADH2', 'GTP'],
        correctAnswer: 0,
        difficulty: 2,
      },
      {
        text: "What is another name for the light-independent reactions?",
        options: ["Krebs Cycle", "Glycolysis", "Electron Transport Chain", "Calvin Cycle"],
        correctAnswer: 3,
        difficulty: 2,
      },
      {
        text: 'Which gas is consumed during the Calvin Cycle?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 2,
        difficulty: 2,
      },
      {
        text: "What is the role of RuBisCO in the Calvin Cycle?",
        options: ["Oxygen fixation", "Carbon fixation", "ATP synthesis", "Light absorption"],
        correctAnswer: 1,
        difficulty: 3,
      },
      {
        text: "What is photorespiration?",
        options: [
            "The process of releasing energy from photons",
            "A process where RuBisCO binds with O2 instead of CO2",
            "The production of light by plants",
            "The plant equivalent of cellular respiration"
        ],
        correctAnswer: 1,
        difficulty: 3
      }
    ],
  },
  {
    id: 'newtons-laws',
    title: "Newton's Laws of Motion",
    description: "Explore the principles governing the motion of objects.",
    topic: 'Physics',
    questions: [
        {
            text: "What is Newton's First Law of Motion often called?",
            options: ["The Law of Acceleration", "The Law of Action-Reaction", "The Law of Inertia", "The Law of Gravity"],
            correctAnswer: 2,
            difficulty: 1
        },
        {
            text: "If you push on a wall, the wall pushes back on you with equal force. This is an example of which of Newton's laws?",
            options: ["First Law", "Second Law", "Third Law", "Law of Universal Gravitation"],
            correctAnswer: 2,
            difficulty: 1
        },
        {
            text: "Newton's Second Law of Motion is represented by which formula?",
            options: ["E=mc²", "F=ma", "P=IV", "v=d/t"],
            correctAnswer: 1,
            difficulty: 2
        },
        {
            text: "An object at rest stays at rest unless acted upon by what?",
            options: ["An internal force", "A balanced force", "An unbalanced force", "Inertia"],
            correctAnswer: 2,
            difficulty: 2
        },
        {
            text: "According to the second law, if you double the force on an object, its acceleration will...",
            options: ["Halve", "Remain the same", "Double", "Quadruple"],
            correctAnswer: 2,
            difficulty: 3
        },
        {
            text: "A rocket moves forward because gas is pushed out of the back. This is an example of which law?",
            options: ["First Law", "Second Law", "Third Law", "Conservation of Energy"],
            correctAnswer: 2,
            difficulty: 3
        }
    ]
  },
  {
    id: 'solar-system',
    title: 'Our Solar System',
    description: 'A quiz about the planets and bodies in our cosmic neighborhood.',
    topic: 'Astronomy',
    questions: [
      {
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        difficulty: 1,
      },
      {
        text: 'What is the largest planet in our Solar System?',
        options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
        correctAnswer: 2,
        difficulty: 1,
      },
      {
        text: 'Which planet is closest to the Sun?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correctAnswer: 0,
        difficulty: 1,
      },
      {
        text: 'The asteroid belt is located between which two planets?',
        options: ['Earth and Mars', 'Mars and Jupiter', 'Jupiter and Saturn', 'Saturn and Uranus'],
        correctAnswer: 1,
        difficulty: 2,
      },
      {
        text: "Which of the following is a dwarf planet?",
        options: ["Ganymede", "Titan", "Ceres", "Europa"],
        correctAnswer: 2,
        difficulty: 2,
      },
      {
        text: "What are Saturn's rings primarily made of?",
        options: ["Gas and dust", "Rock and metal", "Ice particles and rock", "Liquid water"],
        correctAnswer: 2,
        difficulty: 3,
      },
      {
        text: "What defines the boundary of the solar system, where the Sun's solar wind is abruptly slowed by pressure from interstellar gas?",
        options: ["Oort Cloud", "Kuiper Belt", "Heliopause", "Asteroid Belt"],
        correctAnswer: 2,
        difficulty: 3,
      },
    ],
  },
];
