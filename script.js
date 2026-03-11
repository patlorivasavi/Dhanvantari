//frontend/script.js
const defaultConfig = {
    app_title: 'Dhanvantari',
    tagline: 'Your Personal Nutrition Guide',
    company_name: 'TriAura'
};

let currentUser = null;
let allUsers = [];
let gameState = {
    points: 0,
    streak: 1,
    quizzes: 0,
    water: 0,
    steps: 0,
    calories: 0,
    sleep: 0,
    dietGenerated: false
};

const dailyTips = [
    "Drink warm water with lemon to boost metabolism!",
    "Include protein in every meal for sustained energy.",
    "Eat the rainbow - colorful foods mean diverse nutrients!",
    "Chew your food slowly for better digestion.",
    "Stay hydrated - aim for 8 glasses of water daily.",
    "Include fermented foods for a healthy gut.",
    "Start your day with a balanced breakfast.",
    "Choose whole grains over refined carbs."
];

const quizQuestions = [{
    question: "Eating fat makes you fat.",
    answer: false,
    fact: "Healthy fats are essential for hormone production and nutrient absorption. It's excess calories from any source that leads to weight gain."
}, {
    question: "Breakfast is the most important meal of the day.",
    answer: false,
    fact: "While breakfast can be beneficial, total daily nutrition matters more than any single meal. Intermittent fasting can be healthy for some people."
}, {
    question: "Drinking 8 glasses of water daily is necessary for everyone.",
    answer: false,
    fact: "Water needs vary based on activity, climate, and body size. Listen to your thirst and check urine color for hydration status."
}, {
    question: "Carbohydrates are bad for weight loss.",
    answer: false,
    fact: "Complex carbohydrates provide essential energy and fiber. The key is choosing whole grains over refined carbs."
}, {
    question: "Spinach is a great source of iron.",
    answer: true,
    fact: "Spinach contains non-heme iron. Pair it with vitamin C foods like citrus to enhance absorption."
}, {
    question: "You need supplements if you eat a balanced diet.",
    answer: false,
    fact: "Most people can get all nutrients from a varied, balanced diet. Supplements may help specific deficiencies."
}, {
    question: "Eating late at night causes weight gain.",
    answer: false,
    fact: "Total calorie intake matters more than timing. However, eating heavy meals late may affect sleep quality."
}, {
    question: "Detox diets remove toxins from the body.",
    answer: false,
    fact: "Your liver and kidneys naturally detoxify the body. Most 'detox' products have no scientific backing."
}, {
    question: "Eggs increase cholesterol dangerously.",
    answer: false,
    fact: "For most people, dietary cholesterol has minimal impact on blood cholesterol. Eggs are nutritious and can be part of a healthy diet."
}, {
    question: "Protein is only important for bodybuilders.",
    answer: false,
    fact: "Everyone needs protein for muscle maintenance, immune function, and tissue repair. Requirements vary by age and activity level."
}];

let quizState = {
    current: 0,
    score: 0,
    answered: false
};

const moodFoods = {
    happy: {
        name: "Happy",
        foods: [{
            emoji: "🍫",
            name: "Dark Chocolate",
            benefit: "Contains mood-boosting compounds"
        }, {
            emoji: "🍓",
            name: "Berries",
            benefit: "Rich in antioxidants for brain health"
        }, {
            emoji: "🥑",
            name: "Avocado",
            benefit: "Healthy fats support neurotransmitters"
        }]
    },
    stressed: {
        name: "Stressed",
        foods: [{
            emoji: "🍵",
            name: "Green Tea",
            benefit: "L-theanine promotes calm focus"
        }, {
            emoji: "🥜",
            name: "Almonds",
            benefit: "Magnesium helps reduce stress"
        }, {
            emoji: "🍠",
            name: "Sweet Potato",
            benefit: "Complex carbs stabilize blood sugar"
        }]
    },
    tired: {
        name: "Tired",
        foods: [{
            emoji: "🍌",
            name: "Banana",
            benefit: "Quick energy from natural sugars"
        }, {
            emoji: "🥚",
            name: "Eggs",
            benefit: "Protein for sustained energy"
        }, {
            emoji: "🥬",
            name: "Spinach",
            benefit: "Iron combats fatigue"
        }]
    },
    anxious: {
        name: "Anxious",
        foods: [{
            emoji: "🐟",
            name: "Salmon",
            benefit: "Omega-3s reduce anxiety"
        }, {
            emoji: "🫐",
            name: "Blueberries",
            benefit: "Antioxidants calm inflammation"
        }, {
            emoji: "🧄",
            name: "Chamomile Tea",
            benefit: "Natural calming properties"
        }]
    },
    energetic: {
        name: "Energetic",
        foods: [{
            emoji: "🥗",
            name: "Leafy Greens",
            benefit: "Sustain your energy levels"
        }, {
            emoji: "🍗",
            name: "Lean Protein",
            benefit: "Build and maintain muscle"
        }, {
            emoji: "🫘",
            name: "Legumes",
            benefit: "Fiber for lasting fullness"
        }]
    }
};

const exercises = {
    underweight: [{
        emoji: "🏋️",
        name: "Strength Training",
        desc: "Build muscle mass with weights"
    }, {
        emoji: "🧘",
        name: "Yoga",
        desc: "Improve flexibility and reduce stress"
    }, {
        emoji: "🚶",
        name: "Walking",
        desc: "Light cardio to boost appetite"
    }],
    normal: [{
        emoji: "🏃",
        name: "Running",
        desc: "Maintain cardiovascular health"
    }, {
        emoji: "🚴",
        name: "Cycling",
        desc: "Low-impact full body workout"
    }, {
        emoji: "🏊",
        name: "Swimming",
        desc: "Great for overall fitness"
    }],
    overweight: [{
        emoji: "🚶",
        name: "Brisk Walking",
        desc: "Start with 30 mins daily"
    }, {
        emoji: "🏊",
        name: "Water Aerobics",
        desc: "Joint-friendly exercise"
    }, {
        emoji: "🧘",
        name: "Pilates",
        desc: "Core strength without impact"
    }],
    obese: [{
        emoji: "🚶",
        name: "Walking",
        desc: "Begin with 15-20 mins"
    }, {
        emoji: "🪑",
        name: "Chair Exercises",
        desc: "Seated strength training"
    }, {
        emoji: "🏊",
        name: "Pool Walking",
        desc: "Reduces joint stress"
    }]
};

const dietPlans = {
    general: {
        indian: {
            breakfast: "Poha with vegetables, green chutney, and masala chai",
            lunch: "Dal, brown rice, sabzi, roti, and buttermilk",
            dinner: "Khichdi with mixed vegetables and raita",
            snacks: "Roasted makhana, fresh fruits, sprouts chaat"
        },
        mediterranean: {
            breakfast: "Greek yogurt with honey, nuts, and fresh figs",
            lunch: "Grilled fish with quinoa and Greek salad",
            dinner: "Hummus, whole wheat pita, and roasted vegetables",
            snacks: "Olives, feta cheese, fresh vegetables"
        },
        asian: {
            breakfast: "Congee with green onions and soft-boiled egg",
            lunch: "Teriyaki salmon with steamed rice and miso soup",
            dinner: "Stir-fried tofu with vegetables and brown rice",
            snacks: "Edamame, seaweed snacks, fresh fruit"
        },
        western: {
            breakfast: "Oatmeal with berries, nuts, and honey",
            lunch: "Grilled chicken salad with whole grain bread",
            dinner: "Baked salmon with roasted vegetables",
            snacks: "Trail mix, yogurt parfait, apple slices"
        }
    },
    diabetes: {
        indian: {
            breakfast: "Moong dal chilla with mint chutney (low GI)",
            lunch: "Methi dal, millet roti, bitter gourd sabzi",
            dinner: "Vegetable soup with multigrain roti",
            snacks: "Cucumber sticks, roasted chana, amla"
        },
        mediterranean: {
            breakfast: "Scrambled eggs with spinach and tomatoes",
            lunch: "Lentil soup with olive oil and whole grain crackers",
            dinner: "Grilled chicken with non-starchy vegetables",
            snacks: "Nuts, cheese cubes, celery with hummus"
        },
        asian: {
            breakfast: "Steamed fish with ginger and bok choy",
            lunch: "Clear soup with tofu, mushrooms, and greens",
            dinner: "Grilled meat with steamed vegetables",
            snacks: "Unsweetened soy milk, cucumber"
        },
        western: {
            breakfast: "Eggs with avocado and whole grain toast",
            lunch: "Turkey and vegetable wrap with hummus",
            dinner: "Grilled lean meat with broccoli and cauliflower",
            snacks: "Cheese, nuts, vegetable sticks"
        }
    },
    'weight-loss': {
        indian: {
            breakfast: "Vegetable upma (small portion) with sambar",
            lunch: "Grilled paneer salad, dal, cucumber raita",
            dinner: "Clear vegetable soup with multigrain roti",
            snacks: "Buttermilk, roasted makhana, green tea"
        },
        mediterranean: {
            breakfast: "Greek yogurt with a few berries",
            lunch: "Large Greek salad with grilled chicken",
            dinner: "Grilled fish with steamed vegetables",
            snacks: "Olives, cucumber, small portion of nuts"
        },
        asian: {
            breakfast: "Miso soup with tofu and seaweed",
            lunch: "Sashimi with salad (no rice)",
            dinner: "Steamed fish with bok choy",
            snacks: "Edamame, green tea, seaweed"
        },
        western: {
            breakfast: "Egg white omelette with vegetables",
            lunch: "Large salad with lean protein",
            dinner: "Grilled chicken breast with asparagus",
            snacks: "Carrot sticks, celery, small apple"
        }
    },
    'muscle-gain': {
        indian: {
            breakfast: "Paneer bhurji, whole wheat toast, banana shake",
            lunch: "Chicken curry, brown rice, dal, curd",
            dinner: "Egg curry with chapati and vegetables",
            snacks: "Protein lassi, soaked almonds, chana"
        },
        mediterranean: {
            breakfast: "Eggs with feta, whole grain bread, fruit",
            lunch: "Grilled lamb with quinoa and vegetables",
            dinner: "Large portion grilled fish with legumes",
            snacks: "Greek yogurt, nuts, cheese"
        },
        asian: {
            breakfast: "Eggs with rice and grilled fish",
            lunch: "Teriyaki chicken with double rice",
            dinner: "Beef stir-fry with noodles",
            snacks: "Protein smoothie, edamame, eggs"
        },
        western: {
            breakfast: "4-egg omelette with oatmeal and banana",
            lunch: "Double chicken breast with sweet potato",
            dinner: "Steak with baked potato and vegetables",
            snacks: "Protein shake, peanut butter sandwich"
        }
    },
    heart: {
        indian: {
            breakfast: "Oats upma with vegetables, green tea",
            lunch: "Fish curry, brown rice, spinach sabzi",
            dinner: "Moong dal khichdi with ghee (limited)",
            snacks: "Walnuts, flaxseed ladoo, fruits"
        },
        mediterranean: {
            breakfast: "Oatmeal with walnuts and berries",
            lunch: "Grilled salmon with olive oil vegetables",
            dinner: "Lentil stew with whole grain bread",
            snacks: "Almonds, fresh fruits, olives"
        },
        asian: {
            breakfast: "Brown rice congee with fish",
            lunch: "Steamed fish with vegetables and seaweed",
            dinner: "Tofu and vegetable soup with rice",
            snacks: "Green tea, edamame, fresh fruit"
        },
        western: {
            breakfast: "Steel-cut oats with berries and flaxseed",
            lunch: "Salmon salad with olive oil dressing",
            dinner: "Grilled chicken with vegetables",
            snacks: "Walnuts, apple, dark chocolate (small)"
        }
    },
    digestion: {
        indian: {
            breakfast: "Idli with sambar, buttermilk",
            lunch: "Light dal, white rice, bottle gourd sabzi",
            dinner: "Khichdi with ghee and pickle (fermented)",
            snacks: "Curd rice, papaya, fennel seeds"
        },
        mediterranean: {
            breakfast: "Probiotic yogurt with honey",
            lunch: "Light vegetable soup with crackers",
            dinner: "Steamed fish with cooked vegetables",
            snacks: "Kefir, cooked fruits, ginger tea"
        },
        asian: {
            breakfast: "Miso soup with soft tofu",
            lunch: "Steamed rice with gentle fish broth",
            dinner: "Congee with ginger and scallions",
            snacks: "Pickled vegetables, ginger tea"
        },
        western: {
            breakfast: "Probiotic yogurt with banana",
            lunch: "Chicken soup with crackers",
            dinner: "Steamed chicken with mashed potatoes",
            snacks: "Applesauce, ginger tea, crackers"
        }
    }
};

const weekModifiers = {
    normal: "",
    exam: "📚 Brain-boosting additions: Add omega-3 rich foods, blueberries, and dark chocolate. Stay hydrated and avoid heavy meals that cause drowsiness.",
    fitness: "💪 High-protein focus: Increase protein portions by 25%, add pre/post workout snacks, ensure adequate carbs for energy.",
    detox: "🌿 Lighter meals: Focus on soups, smoothies, plenty of water, and easily digestible foods. Avoid processed items."
};

const articleContent = {
    'balanced-eating': {
        title: '🥗 The Science of Balanced Eating',
        category: 'NUTRITION',
        emoji: '🥗',
        gradient: 'from-violet-500 to-violet-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">Understanding Macronutrients</h3>
          <p>Your body requires three primary macronutrients to function optimally: carbohydrates, proteins, and fats. Each plays a crucial role in your health.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Carbohydrates</h3>
          <p>Complex carbohydrates provide sustained energy and fiber for digestive health. Choose whole grains, legumes, and vegetables over refined options.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Proteins</h3>
          <p>Essential for muscle repair, immune function, and hormone production. Include varied sources: lean meats, fish, legumes, nuts, and dairy.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Healthy Fats</h3>
          <p>Support brain health and nutrient absorption. Focus on omega-3 rich sources like salmon, walnuts, and flaxseeds.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">The 40-30-30 Rule</h3>
          <p>A balanced plate typically contains 40% carbohydrates, 30% protein, and 30% healthy fats. Adjust based on your personal health goals and lifestyle.</p>
        `
    },
    'gut-health': {
        title: '🧬 Gut Microbiome & Mental Health',
        category: 'SCIENCE',
        emoji: '🧬',
        gradient: 'from-cyan-500 to-cyan-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">The Gut-Brain Connection</h3>
          <p>Your gut contains over 100 trillion microorganisms that communicate with your brain through the vagus nerve, influencing mood, anxiety, and cognitive function.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Neurotransmitter Production</h3>
          <p>Your gut bacteria produce neurotransmitters like serotonin and GABA. About 90% of your body's serotonin is produced in the gut, directly affecting mood regulation.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Supporting Your Microbiome</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Eat fermented foods: yogurt, kimchi, kombucha, sauerkraut</li>
            <li>Include prebiotic foods: garlic, onions, bananas, asparagus</li>
            <li>Increase dietary fiber from whole grains and vegetables</li>
            <li>Reduce processed foods and added sugars</li>
            <li>Stay hydrated and manage stress</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">The Research</h3>
          <p>Studies show that people with diverse gut bacteria have better mental health outcomes, improved focus, and lower anxiety levels.</p>
        `
    },
    'exercise-nutrients': {
        title: '🏋️ Exercise & Nutrient Absorption',
        category: 'BODY',
        emoji: '🏋️',
        gradient: 'from-fuchsia-500 to-fuchsia-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">How Exercise Enhances Nutrition</h3>
          <p>Physical activity doesn't just burn calories—it fundamentally improves your body's ability to absorb and utilize nutrients from food.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Improved Digestion</h3>
          <p>Regular exercise stimulates digestive enzymes and improves gut motility, allowing your body more time to absorb essential nutrients.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Enhanced Mineral Absorption</h3>
          <p>Exercise increases blood flow to the intestines, improving absorption of calcium, iron, and magnesium—nutrients crucial for bone strength and energy.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Optimal Pre and Post-Workout Nutrition</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Before exercise (30-60 min):</strong> Light carbs + protein (banana with almond butter)</li>
            <li><strong>During (30+ min workouts):</strong> Hydration and electrolytes</li>
            <li><strong>After (within 1 hour):</strong> Protein + carbs (Greek yogurt with granola)</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Consistency Matters</h3>
          <p>The benefits of improved nutrient absorption are cumulative, appearing after 2-3 weeks of regular exercise combined with balanced nutrition.</p>
        `
    },
    'brain-foods': {
        title: '🧠 Brain Foods for Better Focus',
        category: 'MIND',
        emoji: '🧠',
        gradient: 'from-amber-500 to-amber-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">Nutrient-Dense Foods for Cognitive Performance</h3>
          <p>Your brain uses approximately 20% of your body's energy. Feeding it the right nutrients directly impacts focus, memory, and mental clarity.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Top Brain-Boosting Foods</h3>
          <ul class="space-y-3 text-gray-700">
            <li><strong>🥦 Broccoli:</strong> Rich in choline, supports memory formation</li>
            <li><strong>🥜 Peanuts:</strong> Contain resveratrol, improves blood flow to brain</li>
            <li><strong>🍓 Berries:</strong> Packed with antioxidants that protect brain cells</li>
            <li><strong>🥑 Avocado:</strong> Lutein supports visual thinking and processing</li>
            <li><strong>🐟 Fatty Fish:</strong> Omega-3s critical for brain development and function</li>
            <li><strong>🍫 Dark Chocolate:</strong> Improves focus and mood with flavonoids</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Timing Your Brain Fuel</h3>
          <p>Eat brain foods 1-2 hours before demanding mental tasks. This allows proper digestion and stable blood sugar, preventing energy crashes.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Hydration is Critical</h3>
          <p>Even mild dehydration (2% fluid loss) impairs cognitive function. Drink water consistently throughout the day for optimal mental performance.</p>
        `
    },
    'ayurveda': {
        title: '🌿 Ancient Wisdom, Modern Health',
        category: 'AYURVEDA',
        emoji: '🌿',
        gradient: 'from-emerald-500 to-emerald-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">Integrating Ayurvedic Principles</h3>
          <p>Ayurveda, India's 5,000-year-old healing system, emphasizes balance and personalization—principles now validated by modern nutritional science.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">The Three Doshas</h3>
          <ul class="space-y-3 text-gray-700">
            <li><strong>🔥 Pitta (Fire):</strong> Associated with digestion and metabolism. Balance with cooling foods like coconut and cucumber.</li>
            <li><strong>💨 Vata (Air):</strong> Associated with movement and creativity. Ground with warm, oiled foods and roots.</li>
            <li><strong>🌊 Kapha (Water):</strong> Associated with stability. Invigorate with warming spices and lighter foods.</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Ayurvedic Practices</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Eat warm, freshly cooked foods when possible</li>
            <li>Include all six tastes: sweet, sour, salty, bitter, pungent, astringent</li>
            <li>Practice mindful eating without distractions</li>
            <li>Use spices like turmeric, ginger, and cumin for their healing properties</li>
            <li>Respect seasonal eating patterns</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Modern Validation</h3>
          <p>Recent studies confirm many Ayurvedic principles—turmeric's anti-inflammatory benefits, ginger's digestive support, and the importance of personalized nutrition based on constitution.</p>
        `
    },
    'heart-health': {
        title: '❤️ Heart-Healthy Diet Patterns',
        category: 'WELLNESS',
        emoji: '❤️',
        gradient: 'from-rose-500 to-rose-600',
        content: `
          <h3 class="font-bold text-xl text-gray-900 mb-4">Protecting Your Most Important Organ</h3>
          <p>Heart disease remains a leading cause of death globally, yet 80% of cases are preventable through diet and lifestyle choices.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">The Mediterranean Diet Advantage</h3>
          <p>Extensive research shows this diet reduces heart disease risk by 30%. Key components include olive oil, fish, whole grains, and abundant vegetables.</p>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Heart-Protective Nutrients</h3>
          <ul class="space-y-3 text-gray-700">
            <li><strong>Omega-3 Fatty Acids:</strong> Reduce inflammation and triglycerides (salmon, sardines, walnuts)</li>
            <li><strong>Fiber:</strong> Lowers cholesterol (oats, legumes, vegetables)</li>
            <li><strong>Potassium:</strong> Regulates blood pressure (bananas, spinach, sweet potatoes)</li>
            <li><strong>Antioxidants:</strong> Protect blood vessel walls (berries, leafy greens, nuts)</li>
            <li><strong>Plant Sterols:</strong> Reduce LDL cholesterol (nuts, seeds, whole grains)</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Foods to Limit</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Processed foods high in sodium</li>
            <li>Trans fats and excessive saturated fats</li>
            <li>Added sugars and refined carbohydrates</li>
            <li>Excessive alcohol</li>
          </ul>
          
          <h3 class="font-bold text-xl text-gray-900 mb-2 mt-6">Lifestyle Synergy</h3>
          <p>Combine heart-healthy eating with regular exercise, stress management, and quality sleep for optimal cardiovascular wellness.</p>
        `
    }
};

function openArticle(articleId, title, emoji, gradient) {
    const article = articleContent[articleId];
    if (!article) return;

    document.getElementById('modal-title').innerHTML = `<span class="text-3xl mr-2">${article.emoji}</span>${article.title}`;
    document.getElementById('modal-content').innerHTML = article.content;
    document.getElementById('article-modal').classList.remove('section-hidden');
    document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
    document.getElementById('article-modal').classList.add('section-hidden');
    document.body.style.overflow = 'auto';
}

function renderArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    const articles = [{
        id: 'balanced-eating',
        title: '🥗 The Science of Balanced Eating',
        category: 'NUTRITION',
        emoji: '🥗',
        gradient: 'from-violet-500 to-violet-600',
        delay: 0.1,
        desc: 'Discover how macronutrients and micronutrients work together for optimal health.'
    }, {
        id: 'gut-health',
        title: '🧬 Gut Microbiome & Mental Health',
        category: 'SCIENCE',
        emoji: '🧬',
        gradient: 'from-cyan-500 to-cyan-600',
        delay: 0.2,
        desc: 'How your digestive system influences your mood and cognitive function.'
    }, {
        id: 'exercise-nutrients',
        title: '🏋️ Exercise & Nutrient Absorption',
        category: 'BODY',
        emoji: '🏋️',
        gradient: 'from-fuchsia-500 to-fuchsia-600',
        delay: 0.3,
        desc: 'Learn how physical activity enhances your body\'s ability to use nutrients.'
    }, {
        id: 'brain-foods',
        title: '🧠 Brain Foods for Better Focus',
        category: 'MIND',
        emoji: '🧠',
        gradient: 'from-amber-500 to-amber-600',
        delay: 0.4,
        desc: 'Optimize your cognitive performance with these scientifically proven foods.'
    }, {
        id: 'ayurveda',
        title: '🌿 Ancient Wisdom, Modern Health',
        category: 'AYURVEDA',
        emoji: '🌿',
        gradient: 'from-emerald-500 to-emerald-600',
        delay: 0.5,
        desc: 'Integrate traditional Ayurvedic principles into your daily nutrition routine.'
    }, {
        id: 'heart-health',
        title: '❤️ Heart-Healthy Diet Patterns',
        category: 'WELLNESS',
        emoji: '❤️',
        gradient: 'from-rose-500 to-rose-600',
        delay: 0.6,
        desc: 'Dietary strategies to support cardiovascular health and longevity.'
    }];

    grid.innerHTML = articles.map(article => `
        <article class="premium-card rounded-2xl overflow-hidden animate-slide" style="animation-delay: ${article.delay}s">
          <div class="h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center">
            <span class="text-6xl">${article.emoji}</span>
          </div>
          <div class="p-6">
            <span class="text-xs font-semibold ${article.category === 'NUTRITION' ? 'text-violet-600' : article.category === 'SCIENCE' ? 'text-cyan-600' : article.category === 'BODY' ? 'text-fuchsia-600' : article.category === 'MIND' ? 'text-amber-600' : article.category === 'AYURVEDA' ? 'text-emerald-600' : 'text-rose-600'} uppercase">${article.category}</span>
            <h3 class="font-bold text-lg text-gray-900 mt-2 mb-3">${article.title.split(' ').slice(1).join(' ')}</h3>
            <p class="text-gray-600 text-sm mb-4">${article.desc}</p>
            <button onclick="openArticle('${article.id}', '${article.title}', '${article.emoji}', '${article.gradient}')" class="text-violet-600 font-semibold text-sm hover:text-violet-700">Read More →</button>
          </div>
        </article>
      `).join('');
}

function showSection(sectionId) {

    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('section-hidden');
    }
}


function showDashSection(sectionId) {
    if (!currentUser) {
        showToast('Please login first', 'error');
        return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('section-hidden');
        // Initialize quiz when opening quiz section
        if (sectionId === 'quiz-section') {
            initQuiz();
        }
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function closeDashSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section && sectionId !== 'bmi-section') {
        section.classList.add('section-hidden');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const age = parseInt(document.getElementById('reg-age').value);
    const gender = document.getElementById('reg-gender').value;
    const weight = parseFloat(document.getElementById('reg-weight').value);
    const height = parseFloat(document.getElementById('reg-height').value);

    if (!username || !email || !password || !age || !gender || !weight || !height) {
        showToast('Please fill all fields', 'error');
        return;
    }
    try {

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            currentUser = data.user; // very important

            showToast("Account created successfully!");
            showSection("dashboard");
            updateDashboard();

        } else {
            showToast(data.message || "Registration failed", "error");
        }

    } catch (err) {
        console.error(err);
        showToast("Server error", "error");
    }

}

async function handleLogin(event) {

    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        showToast("Please enter email and password", "error");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.user) {

            currentUser = data.user;

            showToast("Welcome back " + data.user.username + "!");
            showSection("dashboard");
            updateDashboard();

        } else {
            showToast(data.message || "Invalid email or password", "error");
        }

    } catch (error) {
        console.error(error);
        showToast("Server error", "error");
    }
}

function handleLogout() {
    currentUser = null;
    gameState = {
        points: 0,
        streak: 1,
        quizzes: 0,
        water: 0,
        steps: 0,
        calories: 0,
        sleep: 0
    };
    showToast('Logged out successfully');
    showSection('landing-page');
}

function updateDashboard() {
    if (!currentUser) return;

    document.getElementById('dash-username').textContent = currentUser.username;
    document.getElementById('user-avatar').textContent = currentUser.username.charAt(0).toUpperCase();

    const tipIndex = new Date().getDate() % dailyTips.length;
    document.getElementById('daily-tip-dash').textContent = dailyTips[tipIndex];
    document.getElementById('daily-tip').textContent = dailyTips[tipIndex];

    document.getElementById('dash-streak').textContent = gameState.streak;
    document.getElementById('dash-quizzes').textContent = gameState.quizzes;
    document.getElementById('user-points').textContent = gameState.points + ' pts';

    document.getElementById('water-count').textContent = gameState.water;
    document.getElementById('steps-count').textContent = gameState.steps.toLocaleString();
    document.getElementById('calories-count').textContent = gameState.calories;
    document.getElementById('sleep-count').textContent = gameState.sleep;

    document.getElementById('bmi-weight').value = currentUser.weight;
    document.getElementById('bmi-height').value = currentUser.height;

    updateBadges();
}

let unlockedBadges = new Set();

function updateBadges() {
    // Quiz Master badge (1+ quiz completed)
    const badgeQuiz = document.getElementById('badge-quiz');
    if (gameState.quizzes >= 1) {
        badgeQuiz.className = 'rounded-2xl p-4 text-center bg-gradient-to-br from-amber-100 to-amber-50 ring-2 ring-amber-300 animate-pulse3d';
        if (!unlockedBadges.has('quiz')) {
            showToast('🏆 Quiz Master badge unlocked!');
            unlockedBadges.add('quiz');
        }
    } else {
        badgeQuiz.className = 'rounded-2xl p-4 text-center bg-gray-100 opacity-50';
    }

    // Hydration Hero badge (8+ water glasses)
    const badgeWater = document.getElementById('badge-water');
    if (gameState.water >= 8) {
        badgeWater.className = 'rounded-2xl p-4 text-center bg-gradient-to-br from-cyan-100 to-cyan-50 ring-2 ring-cyan-300 animate-pulse3d';
        if (!unlockedBadges.has('water')) {
            showToast('💧 Hydration Hero badge unlocked!');
            unlockedBadges.add('water');
        }
    } else {
        badgeWater.className = 'rounded-2xl p-4 text-center bg-gray-100 opacity-50';
    }

    // Step Champion badge (5,000+ steps)
    const badgeSteps = document.getElementById('badge-steps');
    if (gameState.steps >= 5000) {
        badgeSteps.className = 'rounded-2xl p-4 text-center bg-gradient-to-br from-violet-100 to-violet-50 ring-2 ring-violet-300 animate-pulse3d';
        if (!unlockedBadges.has('steps')) {
            showToast('🚀 Step Champion badge unlocked!');
            unlockedBadges.add('steps');
        }
    } else {
        badgeSteps.className = 'rounded-2xl p-4 text-center bg-gray-100 opacity-50';
    }

    // 7 Day Streak badge
    const badgeStreak = document.getElementById('badge-streak');
    if (gameState.streak >= 7) {
        badgeStreak.className = 'rounded-2xl p-4 text-center bg-gradient-to-br from-rose-100 to-rose-50 ring-2 ring-rose-300 animate-pulse3d';
        if (!unlockedBadges.has('streak')) {
            showToast('🔥 7 Day Streak badge unlocked!');
            unlockedBadges.add('streak');
        }
    } else {
        badgeStreak.className = 'rounded-2xl p-4 text-center bg-gray-100 opacity-50';
    }

    // Knowledge Seeker badge (diet plan generated)
    const badgeExplorer = document.getElementById('badge-explorer');
    if (gameState.dietGenerated) {
        badgeExplorer.className = 'rounded-2xl p-4 text-center bg-gradient-to-br from-emerald-100 to-emerald-50 ring-2 ring-emerald-300 animate-pulse3d';
        if (!unlockedBadges.has('explorer')) {
            showToast('📚 Knowledge Seeker badge unlocked!');
            unlockedBadges.add('explorer');
        }
    } else {
        badgeExplorer.className = 'rounded-2xl p-4 text-center bg-gray-100 opacity-50';
    }
}

function calculateBMI() {

    const weightInput = document.getElementById('bmi-weight').value;
    const heightInput = document.getElementById('bmi-height').value;

    const weight = parseFloat(weightInput);
    const height = parseFloat(heightInput) / 100; // convert cm → meters

    if (!weight || !height) {
        showToast('Please enter weight and height', 'error');
        return;
    }

    // BMI Calculation
    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);

    document.getElementById('bmi-value').textContent = bmiValue;

    let status = "";
    let statusClass = "";
    let category = "";

    // BMI Classification (WHO Standard)
    if (bmi < 18.5) {
        status = "Underweight";
        statusClass = "text-amber-600";
        category = "underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        status = "Normal Weight";
        statusClass = "text-emerald-600";
        category = "normal";
    } else if (bmi >= 25 && bmi < 30) {
        status = "Overweight";
        statusClass = "text-orange-600";
        category = "overweight";
    } else {
        status = "Obese";
        statusClass = "text-red-600";
        category = "obese";
    }

    // Update UI
    const statusElement = document.getElementById('bmi-status');
    statusElement.textContent = status;
    statusElement.className = 'mt-4 font-semibold ' + statusClass;

    // Progress circle animation
    const circle = document.getElementById('bmi-circle');
    const circumference = 339.292;
    const progress = Math.min(bmi / 40, 1);

    circle.style.strokeDashoffset = circumference - (progress * circumference);

    // Show recommended exercises
    showExerciseRecommendations(category);

    // Gamification points
    gameState.points += 10;
    updateDashboard();
    showToast('BMI calculated! +10 points');

    // Save BMI to database
    if (currentUser && currentUser.user_id) {

        fetch("http://localhost:5000/save-bmi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.user_id,
                    height_cm: height * 100,
                    weight_kg: weight,
                    bmi_value: bmiValue,
                    category: status
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("BMI saved successfully:", data);
            })
            .catch(error => {
                console.error("Error saving BMI:", error);
            });

    } else {
        console.warn("User not logged in. BMI not saved.");
    }
}

function showExerciseRecommendations(category) {
    const container = document.getElementById('exercise-recommendations');
    const list = document.getElementById('exercise-list');

    container.classList.remove('hidden');
    list.innerHTML = '';

    const recommendations = exercises[category] || exercises.normal;
    recommendations.forEach((ex, index) => {
        const card = document.createElement('div');
        card.className = 'bg-gradient-to-br from-violet-50 to-cyan-50 rounded-xl p-4 text-center animate-slide';
        card.style.animationDelay = (index * 0.1) + 's';
        card.innerHTML = `
          <span class="text-4xl block mb-2">${ex.emoji}</span>
          <h4 class="font-bold text-gray-900">${ex.name}</h4>
          <p class="text-sm text-gray-600">${ex.desc}</p>
        `;
        list.appendChild(card);
    });
}

function initQuiz() {
    quizState = {
        current: 0,
        score: 0,
        answered: false
    };
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-complete').classList.add('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (quizState.current >= quizQuestions.length) {
        showQuizComplete();
        return;
    }

    const q = quizQuestions[quizState.current];
    document.getElementById('quiz-question').textContent = q.question;
    document.getElementById('quiz-current').textContent = quizState.current + 1;
    document.getElementById('quiz-total').textContent = quizQuestions.length;
    document.getElementById('quiz-score-display').textContent = 'Score: ' + quizState.score;
    document.getElementById('quiz-progress').style.width = ((quizState.current + 1) / quizQuestions.length * 100) + '%';

    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    document.getElementById('quiz-explanation').classList.add('hidden');
    quizState.answered = false;
}

function answerQuiz(userAnswer) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizQuestions[quizState.current];
    const isCorrect = userAnswer === q.answer;

    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        if (userAnswer) {
            buttons[0].classList.add('correct');
        } else {
            buttons[1].classList.add('correct');
        }
        quizState.score++;
        gameState.points += 20;
    } else {
        if (userAnswer) {
            buttons[0].classList.add('incorrect');
        } else {
            buttons[1].classList.add('incorrect');
        }
    }

    const explanation = document.getElementById('quiz-explanation');
    explanation.classList.remove('hidden');
    explanation.className = 'mt-6 p-4 rounded-xl ' + (isCorrect ? 'bg-emerald-50' : 'bg-red-50');
    document.getElementById('quiz-explanation-text').innerHTML = `
        <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>
        <span class="text-gray-600">${q.fact}</span>
      `;

    setTimeout(() => {
        quizState.current++;
        loadQuestion();
    }, 3000);
}

function showQuizComplete() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('quiz-complete').classList.remove('hidden');

    const accuracy = Math.round((quizState.score / quizQuestions.length) * 100);
    document.getElementById('final-score').textContent = quizState.score + '/' + quizQuestions.length;
    document.getElementById('final-accuracy').textContent = 'Accuracy: ' + accuracy + '%';

    gameState.quizzes++;
    updateDashboard();
    showToast('Quiz completed! +' + (quizState.score * 20) + ' points');
}

function restartQuiz() {
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-complete').classList.add('hidden');
    initQuiz();
}

function selectMood(mood) {
    document.querySelectorAll('.mood-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    const moodData = moodFoods[mood];
    document.getElementById('mood-selected-name').textContent = moodData.name;
    document.getElementById('mood-suggestions').classList.remove('hidden');

    const list = document.getElementById('mood-food-list');
    list.innerHTML = '';

    moodData.foods.forEach((food, index) => {
        const card = document.createElement('div');
        card.className = 'premium-card rounded-xl p-4 text-center animate-slide';
        card.style.animationDelay = (index * 0.1) + 's';
        card.innerHTML = `
          <span class="text-4xl block mb-2">${food.emoji}</span>
          <h4 class="font-bold text-gray-900">${food.name}</h4>
          <p class="text-sm text-gray-600">${food.benefit}</p>
        `;
        list.appendChild(card);
    });

    gameState.points += 5;
    updateDashboard();
    showToast('Mood selected! +5 points');
}

function generateDietPlan() {
    const health = document.getElementById('diet-health').value;
    const budget = document.getElementById('diet-budget').value;
    const weekType = document.getElementById('diet-week').value;
    const culture = document.getElementById('diet-culture').value;

    const plan = (dietPlans[health] && dietPlans[health][culture]) ? dietPlans[health][culture] : dietPlans.general[culture];
    const weekMod = weekModifiers[weekType];

    const container = document.getElementById('diet-plan-result');
    const mealsDiv = document.getElementById('diet-meals');

    container.classList.remove('hidden');
    mealsDiv.innerHTML = '';

    const budgetEmoji = {
        low: '💰',
        medium: '💵',
        high: '💎'
    };

    const meals = [{
        time: 'Breakfast',
        emoji: '🌅',
        content: plan.breakfast
    }, {
        time: 'Lunch',
        emoji: '☀️',
        content: plan.lunch
    }, {
        time: 'Dinner',
        emoji: '🌙',
        content: plan.dinner
    }, {
        time: 'Snacks',
        emoji: '🍎',
        content: plan.snacks
    }];

    meals.forEach((meal, index) => {
        const card = document.createElement('div');
        card.className = 'premium-card rounded-xl p-4 animate-slide';
        card.style.animationDelay = (index * 0.1) + 's';
        card.innerHTML = `
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">${meal.emoji}</span>
            <h4 class="font-bold text-gray-900">${meal.time}</h4>
            <span class="ml-auto">${budgetEmoji[budget]}</span>
          </div>
          <p class="text-gray-600">${meal.content}</p>
        `;
        mealsDiv.appendChild(card);
    });

    if (weekMod) {
        const modCard = document.createElement('div');
        modCard.className = 'bg-gradient-to-r from-violet-100 to-cyan-100 rounded-xl p-4 mt-4 animate-slide';
        modCard.innerHTML = `<p class="text-gray-700 font-medium">${weekMod}</p>`;
        mealsDiv.appendChild(modCard);
    }

    gameState.dietGenerated = true;
    gameState.points += 15;
    updateDashboard();
    showToast('Diet plan generated! +15 points');
}

function incrementWater() {
    gameState.water++;
    document.getElementById('water-count').textContent = gameState.water;
    gameState.points += 2;
    updateDashboard();
    if (gameState.water === 8) {
        showToast('🎉 Hydration goal reached!');
    }
}

function addSteps() {
    gameState.steps += 1000;
    document.getElementById('steps-count').textContent = gameState.steps.toLocaleString();
    gameState.points += 5;
    updateDashboard();
    if (gameState.steps >= 10000) {
        showToast('🎉 10K steps achieved!');
    }
}

function addCalories() {
    gameState.calories += 100;
    document.getElementById('calories-count').textContent = gameState.calories;
    gameState.points += 1;
    updateDashboard();
}

function addSleep() {
    gameState.sleep++;
    document.getElementById('sleep-count').textContent = gameState.sleep;
    gameState.points += 3;
    updateDashboard();
}

async function init() {
    await initElementSDK();
    await initDataSDK();

    const tipIndex = Math.floor(Math.random() * dailyTips.length);
    document.getElementById('daily-tip').textContent = dailyTips[tipIndex];
}

init();