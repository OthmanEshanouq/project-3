// Content data for Halawah Restaurant
// Bilingual content (English and Arabic)

const contentData = {
    // Reviews - 11 total (9 five-star, 2 four-star) - All with Arabic names
    reviews: [
        {
            name: "Omar",
            rating: 5,
            text: "Amazing food and excellent service! The buffet has a great variety of Middle Eastern and international dishes. Highly recommended!"
        },
        {
            name: "Fatimah",
            rating: 5,
            text: "One of the best restaurants in Amman! The atmosphere is cozy and the staff is very friendly. The coffee is exceptional too."
        },
        {
            name: "Zaid",
            rating: 5,
            text: "Perfect place for family dinners. The open buffet is fantastic with fresh, delicious food. Will definitely come back!"
        },
        {
            name: "Layla",
            rating: 5,
            text: "Great experience! The food quality is outstanding and the prices are reasonable. Love the variety of juices and drinks."
        },
        {
            name: "Ahmad",
            rating: 5,
            text: "Excellent restaurant with authentic flavors. The service was prompt and the ambiance is perfect for both lunch and dinner."
        },
        {
            name: "Mariam",
            rating: 5,
            text: "Best halal restaurant in Khalda! The buffet selection is impressive and everything tastes fresh. Highly satisfied!"
        },
        {
            name: "Yusuf",
            rating: 5,
            text: "Outstanding food and service. The staff goes above and beyond to ensure a great dining experience. Five stars!"
        },
        {
            name: "Sara",
            rating: 5,
            text: "Wonderful restaurant! The fusion of local and international flavors is done perfectly. Great value for money."
        },
        {
            name: "Khalid",
            rating: 5,
            text: "Exceptional quality and taste. The restaurant is clean, well-maintained, and the food is always fresh. Highly recommended!"
        },
        {
            name: "Nour",
            rating: 4,
            text: "Very good restaurant with nice atmosphere. The food is delicious, though I wish there were more dessert options. Overall great experience!"
        },
        {
            name: "Hassan",
            rating: 4,
            text: "Good food and friendly staff. The location is convenient and the prices are fair. Would visit again for sure."
        }
    ],

    // Reviews in Arabic - All with Arabic names
    reviewsAr: [
        {
            name: "عمر",
            rating: 5,
            text: "طعام رائع وخدمة ممتازة! البوفيه يحتوي على مجموعة رائعة من الأطباق الشرق أوسطية والدولية. أنصح به بشدة!"
        },
        {
            name: "فاطمة",
            rating: 5,
            text: "واحدة من أفضل المطاعم في عمان! الجو مريح والموظفون ودودون جداً. القهوة استثنائية أيضاً."
        },
        {
            name: "زيد",
            rating: 5,
            text: "مكان مثالي لعشاء العائلة. البوفيه المفتوح رائع مع طعام طازج ولذيذ. سأعود بالتأكيد!"
        },
        {
            name: "ليلى",
            rating: 5,
            text: "تجربة رائعة! جودة الطعام ممتازة والأسعار معقولة. أحب مجموعة العصائر والمشروبات."
        },
        {
            name: "أحمد",
            rating: 5,
            text: "مطعم ممتاز بنكهات أصيلة. الخدمة كانت سريعة والجو مثالي للغداء والعشاء."
        },
        {
            name: "مريم",
            rating: 5,
            text: "أفضل مطعم حلال في خلدا! اختيار البوفيه مثير للإعجاب وكل شيء طعمه طازج. راضية جداً!"
        },
        {
            name: "يوسف",
            rating: 5,
            text: "طعام وخدمة متميزة. الموظفون يبذلون قصارى جهدهم لضمان تجربة طعام رائعة. خمس نجوم!"
        },
        {
            name: "سارة",
            rating: 5,
            text: "مطعم رائع! اندماج النكهات المحلية والدولية يتم بشكل مثالي. قيمة ممتازة مقابل المال."
        },
        {
            name: "خالد",
            rating: 5,
            text: "جودة وطعم استثنائيان. المطعم نظيف ومحافظ عليه والطعام دائماً طازج. أنصح به بشدة!"
        },
        {
            name: "نور",
            rating: 4,
            text: "مطعم جيد جداً بجو لطيف. الطعام لذيذ، رغم أنني أتمنى لو كان هناك المزيد من خيارات الحلويات. تجربة رائعة بشكل عام!"
        },
        {
            name: "حسان",
            rating: 4,
            text: "طعام جيد وموظفون ودودون. الموقع مناسب والأسعار عادلة. سأزور مرة أخرى بالتأكيد."
        }
    ],

    // FAQ Items
    faq: [
        {
            question: "What are your operating hours?",
            answer: "We are open for lunch from 15:00 to 18:00 and for dinner from 20:00 to 23:00. Both lunch and dinner are served as open buffets."
        },
        {
            question: "Do you accept reservations?",
            answer: "Yes, we accept reservations for Thursdays, Fridays, and Saturdays. You can make a reservation through our website or by calling us at 0787426310."
        },
        {
            question: "Is the food halal?",
            answer: "Yes, all our food is 100% halal. We serve Middle Eastern and international cuisine, all prepared according to halal standards."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept cash and major credit cards. Please contact us for more information about payment options."
        },
        {
            question: "Do you have vegetarian options?",
            answer: "Yes, our buffet includes a variety of vegetarian dishes. We have many options for vegetarians in both our Middle Eastern and international selections."
        },
        {
            question: "Is parking available?",
            answer: "Yes, we have parking available near the restaurant. Please contact us for more details about parking locations."
        },
        {
            question: "Can I host a private event?",
            answer: "Yes, we can accommodate private events and gatherings. Please contact us in advance to discuss your requirements and make arrangements."
        },
        {
            question: "Do you offer takeout or delivery?",
            answer: "Currently, we focus on dine-in service with our open buffet. Please contact us to inquire about special arrangements for takeout."
        }
    ],

    // FAQ Items in Arabic
    faqAr: [
        {
            question: "ما هي ساعات العمل؟",
            answer: "نحن مفتوحون للغداء من 15:00 إلى 18:00 وللعشاء من 20:00 إلى 23:00. يتم تقديم الغداء والعشاء كبوفيه مفتوح."
        },
        {
            question: "هل تقبلون الحجوزات؟",
            answer: "نعم، نقبل الحجوزات للخميس والجمعة والسبت. يمكنك إجراء حجز من خلال موقعنا الإلكتروني أو بالاتصال بنا على 0787426310."
        },
        {
            question: "هل الطعام حلال؟",
            answer: "نعم، كل طعامنا حلال 100%. نقدم المأكولات الشرق أوسطية والدولية، كلها محضرة وفقاً لمعايير الحلال."
        },
        {
            question: "ما هي طرق الدفع التي تقبلونها؟",
            answer: "نقبل النقد وبطاقات الائتمان الرئيسية. يرجى الاتصال بنا لمزيد من المعلومات حول خيارات الدفع."
        },
        {
            question: "هل لديكم خيارات نباتية؟",
            answer: "نعم، بوفيهنا يتضمن مجموعة متنوعة من الأطباق النباتية. لدينا العديد من الخيارات للنباتيين في كل من اختياراتنا الشرق أوسطية والدولية."
        },
        {
            question: "هل يوجد موقف سيارات؟",
            answer: "نعم، لدينا موقف سيارات متاح بالقرب من المطعم. يرجى الاتصال بنا لمزيد من التفاصيل حول مواقع مواقف السيارات."
        },
        {
            question: "هل يمكنني استضافة حدث خاص؟",
            answer: "نعم، يمكننا استيعاب الأحداث الخاصة والتجمعات. يرجى الاتصال بنا مسبقاً لمناقشة متطلباتك وترتيب الترتيبات."
        },
        {
            question: "هل تقدمون خدمة الطلبات الخارجية أو التوصيل؟",
            answer: "حالياً، نركز على خدمة تناول الطعام في المطعم مع بوفيهنا المفتوح. يرجى الاتصال بنا للاستفسار عن الترتيبات الخاصة للطلبات الخارجية."
        }
    ],

    // Restaurant Information
    restaurantInfo: {
        name: {
            en: "Halawah",
            ar: "حلاوة"
        },
        location: {
            en: "Khalda, Amman",
            ar: "خلدا، عمان"
        },
        phone: "0787426310",
        cuisine: {
            en: "Middle Eastern & International (100% Halal)",
            ar: "شرق أوسطي ودولي (حلال 100%)"
        },
        drinks: {
            en: "Full coffee house menu (Espresso, Latte, etc.) + Fresh juices and Soda",
            ar: "قائمة كاملة لمقهى (إسبريسو، لاتيه، إلخ) + عصائر طازجة ومشروبات غازية"
        },
        schedule: {
            lunch: {
                en: "Lunch: 15:00 - 18:00 (Open Buffet)",
                ar: "الغداء: 15:00 - 18:00 (بوفيه مفتوح)"
            },
            dinner: {
                en: "Dinner: 20:00 - 23:00 (Open Buffet)",
                ar: "العشاء: 20:00 - 23:00 (بوفيه مفتوح)"
            }
        }
    }
};
