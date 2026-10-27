/**
 * Comprehensive Question Bank for Class 2 Changing Sentences:
 * 1. Assertive to Interrogative
 * 2. Interrogative to Assertive
 * 
 * Covering:
 * - 'Be' verbs (is, am, are, was, were)
 * - 'Have' verbs (has, have, had)
 * - Modal verbs (can, may, will, shall)
 * - Action verbs (do, does, did)
 * - Affirmative to Negative Interrogative & Negative to Affirmative
 */

const rawQuestions = [
  // ==========================================
  // PART 1: ASSERTIVE TO INTERROGATIVE (60 Items)
  // ==========================================
  {
    type: "assertive_to_interrogative",
    sentence: "He is a good boy.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't he a good boy?",
      "Is he a good boy.",
      "Does he a good boy?",
      "Was he not a good boy?"
    ],
    answer: 0,
    explanation: "Affirmative sentence with 'is' changes to negative interrogative: 'Isn't he a good boy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She is my best friend.",
    prompt: "Change into Interrogative:",
    options: [
      "Is she my best friend.",
      "Isn't she my best friend?",
      "Does she my best friend?",
      "Will she be my best friend?"
    ],
    answer: 1,
    explanation: "'is' comes to the front with 'not' (isn't) and ends with a question mark (?): 'Isn't she my best friend?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The sky is blue.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't the sky blue?",
      "Is the sky blue.",
      "The sky isn't blue?",
      "Does the sky blue?"
    ],
    answer: 0,
    explanation: "Universal truth with 'is' becomes: 'Isn't the sky blue?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "They are playing in the garden.",
    prompt: "Change into Interrogative:",
    options: [
      "Do they play in the garden?",
      "Are they not playing in the garden?",
      "They are playing in the garden?",
      "Were they playing in the garden?"
    ],
    answer: 1,
    explanation: "'are' comes first: 'Are they not playing in the garden?' or 'Aren't they playing in the garden?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "I am ready for school.",
    prompt: "Change into Interrogative:",
    options: [
      "Am I not ready for school?",
      "I am not ready for school?",
      "Do I ready for school?",
      "Was I ready for school?"
    ],
    answer: 0,
    explanation: "'I am' becomes 'Am I not ready for school?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The baby is sleeping.",
    prompt: "Change into Interrogative:",
    options: [
      "Is the baby sleep?",
      "Isn't the baby sleeping?",
      "Does the baby sleeping?",
      "The baby is sleeping?"
    ],
    answer: 1,
    explanation: "'The baby is' becomes 'Isn't the baby sleeping?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He was sick yesterday.",
    prompt: "Change into Interrogative:",
    options: [
      "Wasn't he sick yesterday?",
      "Is he sick yesterday?",
      "Did he sick yesterday?",
      "Was he sick yesterday."
    ],
    answer: 0,
    explanation: "Past tense 'was' becomes 'Wasn't he sick yesterday?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "We were very happy.",
    prompt: "Change into Interrogative:",
    options: [
      "Weren't we very happy?",
      "Are we very happy?",
      "Did we very happy?",
      "We were very happy?"
    ],
    answer: 0,
    explanation: "Past plural 'were' becomes 'Weren't we very happy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She can draw a flower.",
    prompt: "Change into Interrogative:",
    options: [
      "Does she can draw a flower?",
      "Can't she draw a flower?",
      "Can she draw a flower.",
      "Is she draw a flower?"
    ],
    answer: 1,
    explanation: "Modal 'can' becomes 'Can't she draw a flower?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Birds can fly in the sky.",
    prompt: "Change into Interrogative:",
    options: [
      "Can't birds fly in the sky?",
      "Do birds fly in the sky.",
      "Are birds fly in the sky?",
      "Can birds fly in the sky."
    ],
    answer: 0,
    explanation: "'Birds can fly' becomes 'Can't birds fly in the sky?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He has a pet dog.",
    prompt: "Change into Interrogative:",
    options: [
      "Hasn't he a pet dog?",
      "Does he has a pet dog?",
      "Is he a pet dog?",
      "He has not a pet dog?"
    ],
    answer: 0,
    explanation: "'He has' changes to 'Hasn't he a pet dog?' (or 'Doesn't he have a pet dog?')"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "They have a big house.",
    prompt: "Change into Interrogative:",
    options: [
      "Haven't they a big house?",
      "Do they have a big house.",
      "Are they a big house?",
      "Have they a big house."
    ],
    answer: 0,
    explanation: "'They have' becomes 'Haven't they a big house?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The cow gives us milk.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't the cow give us milk?",
      "Does the cow gives us milk?",
      "Is the cow give us milk?",
      "Did the cow give us milk?"
    ],
    answer: 0,
    explanation: "Present simple third person 'gives' uses 'Doesn't' + base verb 'give': 'Doesn't the cow give us milk?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The sun rises in the east.",
    prompt: "Change into Interrogative:",
    options: [
      "Does the sun rise in the east.",
      "Doesn't the sun rise in the east?",
      "Is the sun rise in the east?",
      "Did the sun rise in the east?"
    ],
    answer: 1,
    explanation: "Universal truth with 'rises' becomes 'Doesn't the sun rise in the east?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She reads her book every day.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't she read her book every day?",
      "Does she reads her book every day?",
      "Is she read her book every day?",
      "Didn't she read her book every day?"
    ],
    answer: 0,
    explanation: "'reads' takes 'Doesn't she read...?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "We love our country.",
    prompt: "Change into Interrogative:",
    options: [
      "Don't we love our country?",
      "Do we love our country.",
      "Are we love our country?",
      "Didn't we love our country?"
    ],
    answer: 0,
    explanation: "Plural subject 'We love' takes 'Don't we love our country?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Children like to play toys.",
    prompt: "Change into Interrogative:",
    options: [
      "Don't children like to play toys?",
      "Do children like to play toys.",
      "Does children like to play toys?",
      "Are children like to play toys?"
    ],
    answer: 0,
    explanation: "'Children' is plural, so it uses 'Don't children like to play toys?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He went to school yesterday.",
    prompt: "Change into Interrogative:",
    options: [
      "Didn't he go to school yesterday?",
      "Did he went to school yesterday?",
      "Doesn't he go to school yesterday?",
      "Was he go to school yesterday?"
    ],
    answer: 0,
    explanation: "Past tense 'went' takes 'Didn't' + base verb 'go': 'Didn't he go to school yesterday?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Mother cooked delicious food.",
    prompt: "Change into Interrogative:",
    options: [
      "Didn't mother cook delicious food?",
      "Did mother cooked delicious food?",
      "Doesn't mother cook delicious food?",
      "Was mother cook delicious food?"
    ],
    answer: 0,
    explanation: "Past tense 'cooked' takes 'Didn't' + base form 'cook'."
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Honey is sweet.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't honey sweet?",
      "Is honey sweet.",
      "Does honey sweet?",
      "Honey is sweet?"
    ],
    answer: 0,
    explanation: "'Honey is sweet' becomes 'Isn't honey sweet?'"
  },
  // Negative to Affirmative Interrogative
  {
    type: "assertive_to_interrogative",
    sentence: "He is not a bad boy.",
    prompt: "Change into Interrogative:",
    options: [
      "Is he a bad boy?",
      "Isn't he a bad boy?",
      "He is a bad boy?",
      "Does he a bad boy?"
    ],
    answer: 0,
    explanation: "Negative assertive ('not') changes into affirmative interrogative without 'not': 'Is he a bad boy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She is not lazy.",
    prompt: "Change into Interrogative:",
    options: [
      "Is she lazy?",
      "Isn't she lazy?",
      "She is lazy?",
      "Does she lazy?"
    ],
    answer: 0,
    explanation: "Negative sentence with 'not' removes 'not': 'Is she lazy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "They are not at home.",
    prompt: "Change into Interrogative:",
    options: [
      "Are they at home?",
      "Aren't they at home?",
      "Do they at home?",
      "They are at home?"
    ],
    answer: 0,
    explanation: "Remove 'not' and invert 'are': 'Are they at home?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "I cannot do this sum.",
    prompt: "Change into Interrogative:",
    options: [
      "Can I do this sum?",
      "Can't I do this sum?",
      "Do I can do this sum?",
      "Could I not do this sum?"
    ],
    answer: 0,
    explanation: "Negative modal 'cannot' becomes affirmative interrogative: 'Can I do this sum?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He does not tell a lie.",
    prompt: "Change into Interrogative:",
    options: [
      "Does he tell a lie?",
      "Doesn't he tell a lie?",
      "Did he tell a lie?",
      "Is he tell a lie?"
    ],
    answer: 0,
    explanation: "Remove 'not': 'Does he tell a lie?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She does not eat fish.",
    prompt: "Change into Interrogative:",
    options: [
      "Does she eat fish?",
      "Doesn't she eat fish?",
      "Is she eat fish?",
      "Did she eat fish?"
    ],
    answer: 0,
    explanation: "'She does not eat' becomes 'Does she eat fish?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "They do not like noise.",
    prompt: "Change into Interrogative:",
    options: [
      "Do they like noise?",
      "Don't they like noise?",
      "Are they like noise?",
      "Did they like noise?"
    ],
    answer: 0,
    explanation: "'They do not' becomes 'Do they like noise?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Water has no colour.",
    prompt: "Change into Interrogative:",
    options: [
      "Has water any colour?",
      "Hasn't water any colour?",
      "Does water no colour?",
      "Is water any colour?"
    ],
    answer: 0,
    explanation: "'no' changes to 'any': 'Has water any colour?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "I never drink cold milk.",
    prompt: "Change into Interrogative:",
    options: [
      "Do I ever drink cold milk?",
      "Don't I ever drink cold milk?",
      "Did I ever drink cold milk?",
      "Am I drink cold milk?"
    ],
    answer: 0,
    explanation: "'never' changes into 'ever': 'Do I ever drink cold milk?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Nobody likes a dishonest boy.",
    prompt: "Change into Interrogative:",
    options: [
      "Who likes a dishonest boy?",
      "Doesn't anyone like a dishonest boy?",
      "Does nobody likes a dishonest boy?",
      "Nobody likes a dishonest boy?"
    ],
    answer: 0,
    explanation: "'Nobody' changes to 'Who': 'Who likes a dishonest boy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Everybody loves flowers.",
    prompt: "Change into Interrogative:",
    options: [
      "Who doesn't love flowers?",
      "Who loves flowers?",
      "Does everybody love flowers.",
      "Doesn't everybody love flowers."
    ],
    answer: 0,
    explanation: "'Everybody' changes to 'Who doesn't...?' : 'Who doesn't love flowers?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Everyone respects a kind person.",
    prompt: "Change into Interrogative:",
    options: [
      "Who doesn't respect a kind person?",
      "Who respects a kind person?",
      "Does everyone respect a kind person.",
      "Is everyone respect a kind person?"
    ],
    answer: 0,
    explanation: "'Everyone' changes into 'Who doesn't respect a kind person?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The apple is sweet.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't the apple sweet?",
      "Is the apple sweet.",
      "Does the apple sweet?",
      "Was the apple sweet?"
    ],
    answer: 0,
    explanation: "'The apple is sweet' becomes 'Isn't the apple sweet?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The earth moves round the sun.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't the earth move round the sun?",
      "Does the earth moves round the sun?",
      "Is the earth move round the sun?",
      "Did the earth move round the sun?"
    ],
    answer: 0,
    explanation: "'moves' becomes 'Doesn't the earth move round the sun?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "A cat has four legs.",
    prompt: "Change into Interrogative:",
    options: [
      "Hasn't a cat four legs?",
      "Does a cat has four legs?",
      "Is a cat four legs?",
      "A cat hasn't four legs?"
    ],
    answer: 0,
    explanation: "'Hasn't a cat four legs?' or 'Doesn't a cat have four legs?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "It was a dark night.",
    prompt: "Change into Interrogative:",
    options: [
      "Wasn't it a dark night?",
      "Was it a dark night.",
      "Is it a dark night?",
      "Did it a dark night?"
    ],
    answer: 0,
    explanation: "Past tense 'was' becomes 'Wasn't it a dark night?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "These mangoes are very sweet.",
    prompt: "Change into Interrogative:",
    options: [
      "Aren't these mangoes very sweet?",
      "Are these mangoes very sweet.",
      "Do these mangoes very sweet?",
      "Were these mangoes very sweet?"
    ],
    answer: 0,
    explanation: "'are' becomes 'Aren't these mangoes very sweet?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He will help me.",
    prompt: "Change into Interrogative:",
    options: [
      "Won't he help me?",
      "Will he help me.",
      "Does he will help me?",
      "Is he help me?"
    ],
    answer: 0,
    explanation: "'will' + 'not' contracts to 'Won't': 'Won't he help me?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "We shall go to the park.",
    prompt: "Change into Interrogative:",
    options: [
      "Shan't we go to the park?",
      "Shall we go to the park.",
      "Do we shall go to the park?",
      "Are we go to the park?"
    ],
    answer: 0,
    explanation: "'shall' + 'not' becomes 'Shan't we go to the park?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Father works in an office.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't father work in an office?",
      "Does father works in an office?",
      "Is father work in an office?",
      "Did father work in an office?"
    ],
    answer: 0,
    explanation: "'works' uses 'Doesn't' + base verb 'work'."
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The train runs fast.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't the train run fast?",
      "Does the train runs fast?",
      "Is the train run fast?",
      "Did the train run fast?"
    ],
    answer: 0,
    explanation: "'runs' becomes 'Doesn't the train run fast?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "You are an honest boy.",
    prompt: "Change into Interrogative:",
    options: [
      "Aren't you an honest boy?",
      "Are you an honest boy.",
      "Do you an honest boy?",
      "Were you an honest boy?"
    ],
    answer: 0,
    explanation: "'You are' becomes 'Aren't you an honest boy?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The lion is the king of beasts.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't the lion the king of beasts?",
      "Is the lion the king of beasts.",
      "Does the lion the king of beasts?",
      "Was the lion the king of beasts?"
    ],
    answer: 0,
    explanation: "'is' becomes 'Isn't the lion the king of beasts?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Stars shine at night.",
    prompt: "Change into Interrogative:",
    options: [
      "Don't stars shine at night?",
      "Do stars shine at night.",
      "Does stars shine at night?",
      "Are stars shine at night?"
    ],
    answer: 0,
    explanation: "Plural 'Stars shine' takes 'Don't stars shine at night?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "She sang a sweet song.",
    prompt: "Change into Interrogative:",
    options: [
      "Didn't she sing a sweet song?",
      "Did she sang a sweet song?",
      "Doesn't she sing a sweet song?",
      "Was she sing a sweet song?"
    ],
    answer: 0,
    explanation: "Past tense 'sang' takes 'Didn't' + base verb 'sing': 'Didn't she sing a sweet song?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He was not present in class.",
    prompt: "Change into Interrogative:",
    options: [
      "Was he present in class?",
      "Wasn't he present in class?",
      "Did he present in class?",
      "Is he present in class?"
    ],
    answer: 0,
    explanation: "Remove 'not': 'Was he present in class?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "We were not tired.",
    prompt: "Change into Interrogative:",
    options: [
      "Were we tired?",
      "Weren't we tired?",
      "Did we tired?",
      "Are we tired?"
    ],
    answer: 0,
    explanation: "Remove 'not': 'Were we tired?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Birds do not swim in water.",
    prompt: "Change into Interrogative:",
    options: [
      "Do birds swim in water?",
      "Don't birds swim in water?",
      "Are birds swim in water?",
      "Did birds swim in water?"
    ],
    answer: 0,
    explanation: "Remove 'not': 'Do birds swim in water?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "A blind man cannot see.",
    prompt: "Change into Interrogative:",
    options: [
      "Can a blind man see?",
      "Can't a blind man see?",
      "Does a blind man see?",
      "Is a blind man see?"
    ],
    answer: 0,
    explanation: "Negative modal 'cannot' becomes affirmative: 'Can a blind man see?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Ice floats on water.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't ice float on water?",
      "Does ice floats on water?",
      "Is ice float on water?",
      "Did ice float on water?"
    ],
    answer: 0,
    explanation: "'floats' takes 'Doesn't' + base form 'float': 'Doesn't ice float on water?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The clock tells the time.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't the clock tell the time?",
      "Does the clock tells the time?",
      "Is the clock tell the time?",
      "Did the clock tell the time?"
    ],
    answer: 0,
    explanation: "'tells' becomes 'Doesn't the clock tell the time?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "My sister has a red doll.",
    prompt: "Change into Interrogative:",
    options: [
      "Hasn't my sister a red doll?",
      "Does my sister has a red doll?",
      "Is my sister a red doll?",
      "Has my sister a red doll."
    ],
    answer: 0,
    explanation: "'has' becomes 'Hasn't my sister a red doll?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "There is no water in the glass.",
    prompt: "Change into Interrogative:",
    options: [
      "Is there any water in the glass?",
      "Isn't there any water in the glass?",
      "Does there any water in the glass?",
      "There is any water in the glass?"
    ],
    answer: 0,
    explanation: "'There is no' becomes 'Is there any water in the glass?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Nobody trusts a liar.",
    prompt: "Change into Interrogative:",
    options: [
      "Who trusts a liar?",
      "Doesn't anyone trust a liar?",
      "Who doesn't trust a liar?",
      "Does nobody trust a liar?"
    ],
    answer: 0,
    explanation: "'Nobody' changes to 'Who': 'Who trusts a liar?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Health is wealth.",
    prompt: "Change into Interrogative:",
    options: [
      "Isn't health wealth?",
      "Is health wealth.",
      "Does health wealth?",
      "Was health wealth?"
    ],
    answer: 0,
    explanation: "'Health is wealth' becomes 'Isn't health wealth?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Trees give us shade and fruits.",
    prompt: "Change into Interrogative:",
    options: [
      "Don't trees give us shade and fruits?",
      "Do trees give us shade and fruits.",
      "Does trees give us shade and fruits?",
      "Are trees give us shade and fruits?"
    ],
    answer: 0,
    explanation: "Plural subject 'Trees give' takes 'Don't trees give us shade and fruits?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "He will not forget your kindness.",
    prompt: "Change into Interrogative:",
    options: [
      "Will he forget your kindness?",
      "Won't he forget your kindness?",
      "Does he forget your kindness?",
      "Did he forget your kindness?"
    ],
    answer: 0,
    explanation: "Remove 'not': 'Will he forget your kindness?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "I had a blue pencil.",
    prompt: "Change into Interrogative:",
    options: [
      "Hadn't I a blue pencil?",
      "Did I have a blue pencil.",
      "Was I a blue pencil?",
      "Have I a blue pencil?"
    ],
    answer: 0,
    explanation: "Past 'had' becomes 'Hadn't I a blue pencil?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "The moon shines at night.",
    prompt: "Change into Interrogative:",
    options: [
      "Doesn't the moon shine at night?",
      "Does the moon shines at night?",
      "Is the moon shine at night?",
      "Did the moon shine at night?"
    ],
    answer: 0,
    explanation: "'shines' becomes 'Doesn't the moon shine at night?'"
  },
  {
    type: "assertive_to_interrogative",
    sentence: "Dogs are faithful animals.",
    prompt: "Change into Interrogative:",
    options: [
      "Aren't dogs faithful animals?",
      "Are dogs faithful animals.",
      "Do dogs faithful animals?",
      "Were dogs faithful animals?"
    ],
    answer: 0,
    explanation: "'are' becomes 'Aren't dogs faithful animals?'"
  },

  // ==========================================
  // PART 2: INTERROGATIVE TO ASSERTIVE (60 Items)
  // ==========================================
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't he a good boy?",
    prompt: "Change into Assertive:",
    options: [
      "He is a good boy.",
      "He was a good boy.",
      "He is not a good boy.",
      "He does a good boy."
    ],
    answer: 0,
    explanation: "Negative interrogative ('Isn't he...?') becomes affirmative assertive ('He is...')."
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't she your sister?",
    prompt: "Change into Assertive:",
    options: [
      "She is your sister.",
      "She isn't your sister.",
      "She was your sister.",
      "She is not sister."
    ],
    answer: 0,
    explanation: "'Isn't she' changes to 'She is your sister.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't the rose a beautiful flower?",
    prompt: "Change into Assertive:",
    options: [
      "The rose is a beautiful flower.",
      "The rose was a beautiful flower.",
      "The rose is not a beautiful flower.",
      "The rose has a beautiful flower."
    ],
    answer: 0,
    explanation: "'Isn't the rose' changes to 'The rose is a beautiful flower.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Aren't they playing football?",
    prompt: "Change into Assertive:",
    options: [
      "They are playing football.",
      "They were playing football.",
      "They are not playing football.",
      "They do play football."
    ],
    answer: 0,
    explanation: "'Aren't they' changes to 'They are playing football.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Am I not your true friend?",
    prompt: "Change into Assertive:",
    options: [
      "I am your true friend.",
      "I was your true friend.",
      "I am not your true friend.",
      "You are my true friend."
    ],
    answer: 0,
    explanation: "'Am I not' changes to 'I am your true friend.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Wasn't he very honest?",
    prompt: "Change into Assertive:",
    options: [
      "He was very honest.",
      "He is very honest.",
      "He was not very honest.",
      "He had very honest."
    ],
    answer: 0,
    explanation: "Past tense 'Wasn't he' becomes 'He was very honest.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Weren't they happy to see you?",
    prompt: "Change into Assertive:",
    options: [
      "They were happy to see you.",
      "They are happy to see you.",
      "They were not happy to see you.",
      "They had happy to see you."
    ],
    answer: 0,
    explanation: "'Weren't they' becomes 'They were happy to see you.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Can't a bird fly?",
    prompt: "Change into Assertive:",
    options: [
      "A bird can fly.",
      "A bird cannot fly.",
      "A bird could fly.",
      "Can a bird fly."
    ],
    answer: 0,
    explanation: "'Can't a bird fly?' becomes 'A bird can fly.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't the sun give us light?",
    prompt: "Change into Assertive:",
    options: [
      "The sun gives us light.",
      "The sun gave us light.",
      "The sun does not give us light.",
      "The sun is give us light."
    ],
    answer: 0,
    explanation: "'Doesn't... give' becomes affirmative present simple: 'The sun gives us light.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't she read her lessons?",
    prompt: "Change into Assertive:",
    options: [
      "She reads her lessons.",
      "She read her lessons.",
      "She does not read her lessons.",
      "She is reading her lessons."
    ],
    answer: 0,
    explanation: "'Doesn't she read' becomes 'She reads her lessons.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Don't we love our parents?",
    prompt: "Change into Assertive:",
    options: [
      "We love our parents.",
      "We do not love our parents.",
      "We loved our parents.",
      "We are loving our parents."
    ],
    answer: 0,
    explanation: "'Don't we love' becomes 'We love our parents.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't he write a letter?",
    prompt: "Change into Assertive:",
    options: [
      "He wrote a letter.",
      "He writes a letter.",
      "He did not write a letter.",
      "He had write a letter."
    ],
    answer: 0,
    explanation: "'Didn't... write' becomes past simple: 'He wrote a letter.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't mother cook fish today?",
    prompt: "Change into Assertive:",
    options: [
      "Mother cooked fish today.",
      "Mother cooks fish today.",
      "Mother did not cook fish today.",
      "Mother was cook fish today."
    ],
    answer: 0,
    explanation: "'Didn't... cook' becomes 'Mother cooked fish today.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Won't they come to our party?",
    prompt: "Change into Assertive:",
    options: [
      "They will come to our party.",
      "They will not come to our party.",
      "They would come to our party.",
      "They are come to our party."
    ],
    answer: 0,
    explanation: "'Won't they' becomes 'They will come to our party.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Hasn't he an umbrella?",
    prompt: "Change into Assertive:",
    options: [
      "He has an umbrella.",
      "He had an umbrella.",
      "He has no umbrella.",
      "Does he have an umbrella."
    ],
    answer: 0,
    explanation: "'Hasn't he' becomes 'He has an umbrella.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Haven't we heard this story?",
    prompt: "Change into Assertive:",
    options: [
      "We have heard this story.",
      "We had heard this story.",
      "We have not heard this story.",
      "Did we hear this story."
    ],
    answer: 0,
    explanation: "'Haven't we' becomes 'We have heard this story.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Is he a thief?",
    prompt: "Change into Assertive:",
    options: [
      "He is not a thief.",
      "He is a thief.",
      "He was a thief.",
      "He wasn't a thief."
    ],
    answer: 0,
    explanation: "Affirmative interrogative without 'not' changes to negative assertive with 'not': 'He is not a thief.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Is she angry with me?",
    prompt: "Change into Assertive:",
    options: [
      "She is not angry with me.",
      "She is angry with me.",
      "She was not angry with me.",
      "She does not angry with me."
    ],
    answer: 0,
    explanation: "Affirmative question becomes negative statement: 'She is not angry with me.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Are they bad students?",
    prompt: "Change into Assertive:",
    options: [
      "They are not bad students.",
      "They are bad students.",
      "They were bad students.",
      "They weren't bad students."
    ],
    answer: 0,
    explanation: "'Are they...?' becomes 'They are not bad students.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Can a blind man see the light?",
    prompt: "Change into Assertive:",
    options: [
      "A blind man cannot see the light.",
      "A blind man can see the light.",
      "A blind man could see the light.",
      "Can't a blind man see the light."
    ],
    answer: 0,
    explanation: "Affirmative question becomes negative assertive: 'A blind man cannot see the light.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Can man live alone?",
    prompt: "Change into Assertive:",
    options: [
      "Man cannot live alone.",
      "Man can live alone.",
      "Man could not live alone.",
      "Does man live alone."
    ],
    answer: 0,
    explanation: "Universal truth: 'Man cannot live alone.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Does a cow eat meat?",
    prompt: "Change into Assertive:",
    options: [
      "A cow does not eat meat.",
      "A cow eats meat.",
      "A cow did not eat meat.",
      "A cow is not eat meat."
    ],
    answer: 0,
    explanation: "'Does... eat meat?' becomes 'A cow does not eat meat.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Do birds swim in the river?",
    prompt: "Change into Assertive:",
    options: [
      "Birds do not swim in the river.",
      "Birds swim in the river.",
      "Birds did not swim in the river.",
      "Birds are not swim in the river."
    ],
    answer: 0,
    explanation: "'Do birds swim...?' becomes 'Birds do not swim in the river.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Did he tell a lie?",
    prompt: "Change into Assertive:",
    options: [
      "He did not tell a lie.",
      "He told a lie.",
      "He does not tell a lie.",
      "He was not tell a lie."
    ],
    answer: 0,
    explanation: "'Did he tell...?' becomes 'He did not tell a lie.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Has water any color?",
    prompt: "Change into Assertive:",
    options: [
      "Water has no color.",
      "Water has color.",
      "Water is no color.",
      "Does water color."
    ],
    answer: 0,
    explanation: "'any color' changes back to 'no color': 'Water has no color.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Do I ever drink cold milk?",
    prompt: "Change into Assertive:",
    options: [
      "I never drink cold milk.",
      "I ever drink cold milk.",
      "I do not drink cold milk.",
      "I am not drink cold milk."
    ],
    answer: 0,
    explanation: "'ever' changes back to 'never': 'I never drink cold milk.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Who doesn't love his mother?",
    prompt: "Change into Assertive:",
    options: [
      "Everyone loves his mother.",
      "Nobody loves his mother.",
      "Anyone loves his mother.",
      "Someone loves his mother."
    ],
    answer: 0,
    explanation: "'Who doesn't love...?' becomes 'Everyone loves his mother.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Who likes a dishonest man?",
    prompt: "Change into Assertive:",
    options: [
      "Nobody likes a dishonest man.",
      "Everybody likes a dishonest man.",
      "Anybody likes a dishonest man.",
      "Someone likes a dishonest man."
    ],
    answer: 0,
    explanation: "'Who likes...?' with negative meaning changes to 'Nobody likes a dishonest man.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Who does not wish to be happy?",
    prompt: "Change into Assertive:",
    options: [
      "Everyone wishes to be happy.",
      "Nobody wishes to be happy.",
      "Anyone wishes to be happy.",
      "No one wishes to be happy."
    ],
    answer: 0,
    explanation: "'Who does not wish...?' becomes 'Everyone wishes to be happy.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Who can touch the sky?",
    prompt: "Change into Assertive:",
    options: [
      "None can touch the sky.",
      "Everyone can touch the sky.",
      "Someone can touch the sky.",
      "Anybody can touch the sky."
    ],
    answer: 0,
    explanation: "'Who can touch...?' becomes 'None can touch the sky.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't honey sweet?",
    prompt: "Change into Assertive:",
    options: [
      "Honey is sweet.",
      "Honey is not sweet.",
      "Honey was sweet.",
      "Does honey sweet."
    ],
    answer: 0,
    explanation: "'Isn't honey sweet?' becomes 'Honey is sweet.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't the baby smiling?",
    prompt: "Change into Assertive:",
    options: [
      "The baby is smiling.",
      "The baby was smiling.",
      "The baby is not smiling.",
      "Does the baby smile."
    ],
    answer: 0,
    explanation: "'Isn't the baby smiling?' becomes 'The baby is smiling.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't milk give us calcium?",
    prompt: "Change into Assertive:",
    options: [
      "Milk gives us calcium.",
      "Milk gave us calcium.",
      "Milk does not give us calcium.",
      "Is milk give us calcium."
    ],
    answer: 0,
    explanation: "'Doesn't milk give...?' becomes 'Milk gives us calcium.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Aren't mangoes sweet fruits?",
    prompt: "Change into Assertive:",
    options: [
      "Mangoes are sweet fruits.",
      "Mangoes were sweet fruits.",
      "Mangoes are not sweet fruits.",
      "Do mangoes sweet fruits."
    ],
    answer: 0,
    explanation: "'Aren't mangoes...?' becomes 'Mangoes are sweet fruits.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't an owl see at night?",
    prompt: "Change into Assertive:",
    options: [
      "An owl sees at night.",
      "An owl saw at night.",
      "An owl does not see at night.",
      "An owl see at night."
    ],
    answer: 0,
    explanation: "'Doesn't an owl see...?' becomes 'An owl sees at night.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't health the greatest wealth?",
    prompt: "Change into Assertive:",
    options: [
      "Health is the greatest wealth.",
      "Health was the greatest wealth.",
      "Health is not the greatest wealth.",
      "Does health greatest wealth."
    ],
    answer: 0,
    explanation: "'Isn't health...' becomes 'Health is the greatest wealth.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't they win the football match?",
    prompt: "Change into Assertive:",
    options: [
      "They won the football match.",
      "They win the football match.",
      "They did not win the football match.",
      "They had win the football match."
    ],
    answer: 0,
    explanation: "'Didn't they win...?' becomes 'They won the football match.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Wasn't Shakespeare a great poet?",
    prompt: "Change into Assertive:",
    options: [
      "Shakespeare was a great poet.",
      "Shakespeare is a great poet.",
      "Shakespeare was not a great poet.",
      "Did Shakespeare a great poet."
    ],
    answer: 0,
    explanation: "'Wasn't Shakespeare...' becomes 'Shakespeare was a great poet.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Don't stars twinkle in the sky?",
    prompt: "Change into Assertive:",
    options: [
      "Stars twinkle in the sky.",
      "Stars twinkled in the sky.",
      "Stars do not twinkle in the sky.",
      "Are stars twinkle in the sky."
    ],
    answer: 0,
    explanation: "'Don't stars twinkle...?' becomes 'Stars twinkle in the sky.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't the teacher praise you?",
    prompt: "Change into Assertive:",
    options: [
      "The teacher praised you.",
      "The teacher praises you.",
      "The teacher did not praise you.",
      "Was the teacher praise you."
    ],
    answer: 0,
    explanation: "'Didn't the teacher praise...?' becomes 'The teacher praised you.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't fire hot?",
    prompt: "Change into Assertive:",
    options: [
      "Fire is hot.",
      "Fire is not hot.",
      "Fire was hot.",
      "Does fire hot."
    ],
    answer: 0,
    explanation: "Universal truth: 'Fire is hot.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Does a tiger eat grass?",
    prompt: "Change into Assertive:",
    options: [
      "A tiger does not eat grass.",
      "A tiger eats grass.",
      "A tiger did not eat grass.",
      "A tiger will eat grass."
    ],
    answer: 0,
    explanation: "Question without not changes into negative assertive: 'A tiger does not eat grass.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Can an elephant fly?",
    prompt: "Change into Assertive:",
    options: [
      "An elephant cannot fly.",
      "An elephant can fly.",
      "An elephant could fly.",
      "Can't an elephant fly."
    ],
    answer: 0,
    explanation: "'Can an elephant fly?' becomes 'An elephant cannot fly.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Was he absent from school?",
    prompt: "Change into Assertive:",
    options: [
      "He was not absent from school.",
      "He was absent from school.",
      "He is not absent from school.",
      "Did he absent from school."
    ],
    answer: 0,
    explanation: "Affirmative question becomes negative assertive: 'He was not absent from school.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Is gold a cheap metal?",
    prompt: "Change into Assertive:",
    options: [
      "Gold is not a cheap metal.",
      "Gold is a cheap metal.",
      "Gold was not a cheap metal.",
      "Does gold a cheap metal."
    ],
    answer: 0,
    explanation: "'Is gold a cheap metal?' becomes 'Gold is not a cheap metal.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't honesty bring peace of mind?",
    prompt: "Change into Assertive:",
    options: [
      "Honesty brings peace of mind.",
      "Honesty brought peace of mind.",
      "Honesty does not bring peace of mind.",
      "Is honesty bring peace of mind."
    ],
    answer: 0,
    explanation: "'Doesn't honesty bring...?' becomes 'Honesty brings peace of mind.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't they reach school on time?",
    prompt: "Change into Assertive:",
    options: [
      "They reached school on time.",
      "They reach school on time.",
      "They did not reach school on time.",
      "Were they reach school on time."
    ],
    answer: 0,
    explanation: "'Didn't they reach...?' becomes 'They reached school on time.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Aren't flowers very sweet smelling?",
    prompt: "Change into Assertive:",
    options: [
      "Flowers are very sweet smelling.",
      "Flowers were very sweet smelling.",
      "Flowers are not very sweet smelling.",
      "Do flowers sweet smelling."
    ],
    answer: 0,
    explanation: "'Aren't flowers...?' becomes 'Flowers are very sweet smelling.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Isn't the river deep?",
    prompt: "Change into Assertive:",
    options: [
      "The river is deep.",
      "The river was deep.",
      "The river is not deep.",
      "Does the river deep."
    ],
    answer: 0,
    explanation: "'Isn't the river deep?' becomes 'The river is deep.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't grandfather tell nice bedtime stories?",
    prompt: "Change into Assertive:",
    options: [
      "Grandfather tells nice bedtime stories.",
      "Grandfather told nice bedtime stories.",
      "Grandfather does not tell nice bedtime stories.",
      "Is grandfather tell nice stories."
    ],
    answer: 0,
    explanation: "'Doesn't grandfather tell...?' becomes 'Grandfather tells nice bedtime stories.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Who does not want to win the prize?",
    prompt: "Change into Assertive:",
    options: [
      "Everyone wants to win the prize.",
      "Nobody wants to win the prize.",
      "Anyone wants to win the prize.",
      "Someone wants to win the prize."
    ],
    answer: 0,
    explanation: "'Who does not want...?' becomes 'Everyone wants to win the prize.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Is there any doubt about it?",
    prompt: "Change into Assertive:",
    options: [
      "There is no doubt about it.",
      "There is doubt about it.",
      "There was no doubt about it.",
      "Is no doubt about it."
    ],
    answer: 0,
    explanation: "'Is there any doubt...?' becomes 'There is no doubt about it.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't practice make a student perfect?",
    prompt: "Change into Assertive:",
    options: [
      "Practice makes a student perfect.",
      "Practice made a student perfect.",
      "Practice does not make a student perfect.",
      "Is practice make perfect."
    ],
    answer: 0,
    explanation: "Proverb: 'Practice makes a student perfect.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Didn't father bring chocolates for us?",
    prompt: "Change into Assertive:",
    options: [
      "Father brought chocolates for us.",
      "Father brings chocolates for us.",
      "Father did not bring chocolates for us.",
      "Was father bring chocolates for us."
    ],
    answer: 0,
    explanation: "'Didn't father bring...?' becomes 'Father brought chocolates for us.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Can a fish live without water?",
    prompt: "Change into Assertive:",
    options: [
      "A fish cannot live without water.",
      "A fish can live without water.",
      "A fish could live without water.",
      "Can't a fish live without water."
    ],
    answer: 0,
    explanation: "'Can a fish live...?' becomes 'A fish cannot live without water.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Is anyone wiser than Solomon?",
    prompt: "Change into Assertive:",
    options: [
      "No one is wiser than Solomon.",
      "Everyone is wiser than Solomon.",
      "Someone is wiser than Solomon.",
      "Anyone is wiser than Solomon."
    ],
    answer: 0,
    explanation: "'Is anyone wiser...?' becomes 'No one is wiser than Solomon.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Has anyone seen the wind?",
    prompt: "Change into Assertive:",
    options: [
      "No one has seen the wind.",
      "Everyone has seen the wind.",
      "Someone has seen the wind.",
      "Anyone has seen the wind."
    ],
    answer: 0,
    explanation: "Poetic line: 'No one has seen the wind.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Doesn't a doctor help sick people?",
    prompt: "Change into Assertive:",
    options: [
      "A doctor helps sick people.",
      "A doctor helped sick people.",
      "A doctor does not help sick people.",
      "Is a doctor help sick people."
    ],
    answer: 0,
    explanation: "'Doesn't a doctor help...?' becomes 'A doctor helps sick people.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Wasn't yesterday a rainy day?",
    prompt: "Change into Assertive:",
    options: [
      "Yesterday was a rainy day.",
      "Yesterday is a rainy day.",
      "Yesterday was not a rainy day.",
      "Did yesterday a rainy day."
    ],
    answer: 0,
    explanation: "'Wasn't yesterday...' becomes 'Yesterday was a rainy day.'"
  },
  {
    type: "interrogative_to_assertive",
    sentence: "Haven't you finished your homework?",
    prompt: "Change into Assertive:",
    options: [
      "You have finished your homework.",
      "You had finished your homework.",
      "You have not finished your homework.",
      "Did you finish your homework."
    ],
    answer: 0,
    explanation: "'Haven't you finished...?' becomes 'You have finished your homework.'"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = rawQuestions;
}
