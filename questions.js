/**
 * Comprehensive Question Bank for Changing Sentences:
 * Assertive ⇄ Interrogative
 * 
 * Levels:
 * - 'class4' : Class 2 to 4 Primary School
 * - 'ssc'    : SSC Board Standard Grammar
 * - 'bcs'    : BCS, University Admission & Job Standard
 */

const rawQuestions = [
  // ==============================================================
  // LEVEL 1: CLASS 4 / PRIMARY (Assertive ➔ Interrogative)
  // ==============================================================
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He is a good boy.",
    prompt: "Change into Interrogative:",
    options: ["Isn't he a good boy?", "Is he a good boy.", "Does he a good boy?", "Was he not a good boy?"],
    answer: 0,
    explanation: "Affirmative sentence with 'is' changes to negative interrogative: 'Isn't he a good boy?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "She is my best friend.",
    prompt: "Change into Interrogative:",
    options: ["Is she my best friend.", "Isn't she my best friend?", "Does she my best friend?", "Will she be my best friend?"],
    answer: 1,
    explanation: "'is' comes to the front with 'not' (isn't) and ends with a question mark (?): 'Isn't she my best friend?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The sky is blue.",
    prompt: "Change into Interrogative:",
    options: ["Isn't the sky blue?", "Is the sky blue.", "The sky isn't blue?", "Does the sky blue?"],
    answer: 0,
    explanation: "Universal truth with 'is' becomes: 'Isn't the sky blue?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "They are playing in the garden.",
    prompt: "Change into Interrogative:",
    options: ["Do they play in the garden?", "Are they not playing in the garden?", "They are playing in the garden?", "Were they playing in the garden?"],
    answer: 1,
    explanation: "'are' comes first: 'Are they not playing in the garden?' or 'Aren't they playing in the garden?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "I am ready for school.",
    prompt: "Change into Interrogative:",
    options: ["Am I not ready for school?", "I am not ready for school?", "Do I ready for school?", "Was I ready for school?"],
    answer: 0,
    explanation: "'I am' becomes 'Am I not ready for school?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The baby is sleeping.",
    prompt: "Change into Interrogative:",
    options: ["Is the baby sleep?", "Isn't the baby sleeping?", "Does the baby sleeping?", "The baby is sleeping?"],
    answer: 1,
    explanation: "'The baby is' becomes 'Isn't the baby sleeping?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He was sick yesterday.",
    prompt: "Change into Interrogative:",
    options: ["Wasn't he sick yesterday?", "Is he sick yesterday?", "Did he sick yesterday?", "Was he sick yesterday."],
    answer: 0,
    explanation: "Past tense 'was' becomes 'Wasn't he sick yesterday?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "We were very happy.",
    prompt: "Change into Interrogative:",
    options: ["Weren't we very happy?", "Are we very happy?", "Did we very happy?", "We were very happy?"],
    answer: 0,
    explanation: "Past plural 'were' becomes 'Weren't we very happy?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "She can draw a flower.",
    prompt: "Change into Interrogative:",
    options: ["Does she can draw a flower?", "Can't she draw a flower?", "Can she draw a flower.", "Is she draw a flower?"],
    answer: 1,
    explanation: "Modal 'can' becomes 'Can't she draw a flower?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "Birds can fly in the sky.",
    prompt: "Change into Interrogative:",
    options: ["Can't birds fly in the sky?", "Do birds fly in the sky.", "Are birds fly in the sky?", "Can birds fly in the sky."],
    answer: 0,
    explanation: "'Birds can fly' becomes 'Can't birds fly in the sky?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He has a pet dog.",
    prompt: "Change into Interrogative:",
    options: ["Hasn't he a pet dog?", "Does he has a pet dog?", "Is he a pet dog?", "He has not a pet dog?"],
    answer: 0,
    explanation: "'He has' changes to 'Hasn't he a pet dog?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "They have a big house.",
    prompt: "Change into Interrogative:",
    options: ["Haven't they a big house?", "Do they have a big house.", "Are they a big house?", "Have they a big house."],
    answer: 0,
    explanation: "'They have' becomes 'Haven't they a big house?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The cow gives us milk.",
    prompt: "Change into Interrogative:",
    options: ["Doesn't the cow give us milk?", "Does the cow gives us milk?", "Is the cow give us milk?", "Did the cow give us milk?"],
    answer: 0,
    explanation: "'gives' uses 'Doesn't' + base verb 'give': 'Doesn't the cow give us milk?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The sun rises in the east.",
    prompt: "Change into Interrogative:",
    options: ["Does the sun rise in the east.", "Doesn't the sun rise in the east?", "Is the sun rise in the east?", "Did the sun rise in the east?"],
    answer: 1,
    explanation: "Universal truth with 'rises' becomes 'Doesn't the sun rise in the east?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "She reads her book every day.",
    prompt: "Change into Interrogative:",
    options: ["Doesn't she read her book every day?", "Does she reads her book every day?", "Is she read her book every day?", "Didn't she read her book every day?"],
    answer: 0,
    explanation: "'reads' takes 'Doesn't she read...?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "We love our country.",
    prompt: "Change into Interrogative:",
    options: ["Don't we love our country?", "Do we love our country.", "Are we love our country?", "Didn't we love our country?"],
    answer: 0,
    explanation: "Plural subject 'We love' takes 'Don't we love our country?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He went to school yesterday.",
    prompt: "Change into Interrogative:",
    options: ["Didn't he go to school yesterday?", "Did he went to school yesterday?", "Doesn't he go to school yesterday?", "Was he go to school yesterday?"],
    answer: 0,
    explanation: "Past tense 'went' takes 'Didn't' + base verb 'go': 'Didn't he go to school yesterday?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "Mother cooked delicious food.",
    prompt: "Change into Interrogative:",
    options: ["Didn't mother cook delicious food?", "Did mother cooked delicious food?", "Doesn't mother cook delicious food?", "Was mother cook delicious food?"],
    answer: 0,
    explanation: "Past tense 'cooked' takes 'Didn't' + base form 'cook'."
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "Honey is sweet.",
    prompt: "Change into Interrogative:",
    options: ["Isn't honey sweet?", "Is honey sweet.", "Does honey sweet?", "Honey is sweet?"],
    answer: 0,
    explanation: "'Honey is sweet' becomes 'Isn't honey sweet?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He is not a bad boy.",
    prompt: "Change into Interrogative:",
    options: ["Is he a bad boy?", "Isn't he a bad boy?", "He is a bad boy?", "Does he a bad boy?"],
    answer: 0,
    explanation: "Negative assertive ('not') changes into affirmative interrogative without 'not': 'Is he a bad boy?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "She is not lazy.",
    prompt: "Change into Interrogative:",
    options: ["Is she lazy?", "Isn't she lazy?", "She is lazy?", "Does she lazy?"],
    answer: 0,
    explanation: "Negative sentence with 'not' removes 'not': 'Is she lazy?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "They are not at home.",
    prompt: "Change into Interrogative:",
    options: ["Are they at home?", "Aren't they at home?", "Do they at home?", "They are at home?"],
    answer: 0,
    explanation: "Remove 'not' and invert 'are': 'Are they at home?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "I cannot do this sum.",
    prompt: "Change into Interrogative:",
    options: ["Can I do this sum?", "Can't I do this sum?", "Do I can do this sum?", "Could I not do this sum?"],
    answer: 0,
    explanation: "Negative modal 'cannot' becomes affirmative interrogative: 'Can I do this sum?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "He does not tell a lie.",
    prompt: "Change into Interrogative:",
    options: ["Does he tell a lie?", "Doesn't he tell a lie?", "Did he tell a lie?", "Is he tell a lie?"],
    answer: 0,
    explanation: "Remove 'not': 'Does he tell a lie?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "She does not eat fish.",
    prompt: "Change into Interrogative:",
    options: ["Does she eat fish?", "Doesn't she eat fish?", "Is she eat fish?", "Did she eat fish?"],
    answer: 0,
    explanation: "'She does not eat' becomes 'Does she eat fish?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "You are an honest boy.",
    prompt: "Change into Interrogative:",
    options: ["Aren't you an honest boy?", "Are you an honest boy.", "Do you an honest boy?", "Were you an honest boy?"],
    answer: 0,
    explanation: "'You are' becomes 'Aren't you an honest boy?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The lion is the king of beasts.",
    prompt: "Change into Interrogative:",
    options: ["Isn't the lion the king of beasts?", "Is the lion the king of beasts.", "Does the lion the king of beasts?", "Was the lion the king of beasts?"],
    answer: 0,
    explanation: "'is' becomes 'Isn't the lion the king of beasts?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "Stars shine at night.",
    prompt: "Change into Interrogative:",
    options: ["Don't stars shine at night?", "Do stars shine at night.", "Does stars shine at night?", "Are stars shine at night?"],
    answer: 0,
    explanation: "Plural 'Stars shine' takes 'Don't stars shine at night?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "Ice floats on water.",
    prompt: "Change into Interrogative:",
    options: ["Doesn't ice float on water?", "Does ice floats on water?", "Is ice float on water?", "Did ice float on water?"],
    answer: 0,
    explanation: "'floats' takes 'Doesn't' + base form 'float': 'Doesn't ice float on water?'"
  },
  {
    level: "class4",
    type: "assertive_to_interrogative",
    sentence: "The clock tells the time.",
    prompt: "Change into Interrogative:",
    options: ["Doesn't the clock tell the time?", "Does the clock tells the time?", "Is the clock tell the time?", "Did the clock tell the time?"],
    answer: 0,
    explanation: "'tells' becomes 'Doesn't the clock tell the time?'"
  },

  // ==============================================================
  // LEVEL 1: CLASS 4 / PRIMARY (Interrogative ➔ Assertive)
  // ==============================================================
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Isn't he a good boy?",
    prompt: "Change into Assertive:",
    options: ["He is a good boy.", "He was a good boy.", "He is not a good boy.", "He does a good boy."],
    answer: 0,
    explanation: "Negative interrogative ('Isn't he...?') becomes affirmative assertive ('He is...')."
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Isn't she your sister?",
    prompt: "Change into Assertive:",
    options: ["She is your sister.", "She isn't your sister.", "She was your sister.", "She is not sister."],
    answer: 0,
    explanation: "'Isn't she' changes to 'She is your sister.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Isn't the rose a beautiful flower?",
    prompt: "Change into Assertive:",
    options: ["The rose is a beautiful flower.", "The rose was a beautiful flower.", "The rose is not a beautiful flower.", "The rose has a beautiful flower."],
    answer: 0,
    explanation: "'Isn't the rose' changes to 'The rose is a beautiful flower.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Aren't they playing football?",
    prompt: "Change into Assertive:",
    options: ["They are playing football.", "They were playing football.", "They are not playing football.", "They do play football."],
    answer: 0,
    explanation: "'Aren't they' changes to 'They are playing football.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Doesn't the sun give us light?",
    prompt: "Change into Assertive:",
    options: ["The sun gives us light.", "The sun gave us light.", "The sun does not give us light.", "The sun is give us light."],
    answer: 0,
    explanation: "'Doesn't... give' becomes affirmative present simple: 'The sun gives us light.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Can't a bird fly?",
    prompt: "Change into Assertive:",
    options: ["A bird can fly.", "A bird cannot fly.", "A bird could fly.", "Can a bird fly."],
    answer: 0,
    explanation: "'Can't a bird fly?' becomes 'A bird can fly.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Is he a thief?",
    prompt: "Change into Assertive:",
    options: ["He is not a thief.", "He is a thief.", "He was a thief.", "He wasn't a thief."],
    answer: 0,
    explanation: "Affirmative interrogative without 'not' changes to negative assertive with 'not': 'He is not a thief.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Does a cow eat meat?",
    prompt: "Change into Assertive:",
    options: ["A cow does not eat meat.", "A cow eats meat.", "A cow did not eat meat.", "A cow is not eat meat."],
    answer: 0,
    explanation: "'Does... eat meat?' becomes 'A cow does not eat meat.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Do birds swim in the river?",
    prompt: "Change into Assertive:",
    options: ["Birds do not swim in the river.", "Birds swim in the river.", "Birds did not swim in the river.", "Birds are not swim in the river."],
    answer: 0,
    explanation: "'Do birds swim...?' becomes 'Birds do not swim in the river.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Didn't mother cook fish today?",
    prompt: "Change into Assertive:",
    options: ["Mother cooked fish today.", "Mother cooks fish today.", "Mother did not cook fish today.", "Mother was cook fish today."],
    answer: 0,
    explanation: "'Didn't... cook' becomes 'Mother cooked fish today.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Isn't honey sweet?",
    prompt: "Change into Assertive:",
    options: ["Honey is sweet.", "Honey is not sweet.", "Honey was sweet.", "Does honey sweet."],
    answer: 0,
    explanation: "'Isn't honey sweet?' becomes 'Honey is sweet.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Aren't mangoes sweet fruits?",
    prompt: "Change into Assertive:",
    options: ["Mangoes are sweet fruits.", "Mangoes were sweet fruits.", "Mangoes are not sweet fruits.", "Do mangoes sweet fruits."],
    answer: 0,
    explanation: "'Aren't mangoes...?' becomes 'Mangoes are sweet fruits.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Can an elephant fly?",
    prompt: "Change into Assertive:",
    options: ["An elephant cannot fly.", "An elephant can fly.", "An elephant could fly.", "Can't an elephant fly."],
    answer: 0,
    explanation: "'Can an elephant fly?' becomes 'An elephant cannot fly.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Can a fish live without water?",
    prompt: "Change into Assertive:",
    options: ["A fish cannot live without water.", "A fish can live without water.", "A fish could live without water.", "Can't a fish live without water."],
    answer: 0,
    explanation: "'Can a fish live...?' becomes 'A fish cannot live without water.'"
  },
  {
    level: "class4",
    type: "interrogative_to_assertive",
    sentence: "Was he absent from school?",
    prompt: "Change into Assertive:",
    options: ["He was not absent from school.", "He was absent from school.", "He is not absent from school.", "Did he absent from school."],
    answer: 0,
    explanation: "Affirmative question becomes negative assertive: 'He was not absent from school.'"
  },

  // ==============================================================
  // LEVEL 2: SSC EXAM STANDARD (Assertive ➔ Interrogative)
  // ==============================================================
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Nobody believes a liar.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who believes a liar?", "Does anybody believe a liar?", "Who doesn't believe a liar?", "Doesn't anyone believe a liar."],
    answer: 0,
    explanation: "In SSC grammar, 'Nobody' changes into 'Who' with affirmative verb: 'Who believes a liar?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Everybody wants to be happy.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who doesn't want to be happy?", "Who wants to be happy?", "Does everybody want to be happy.", "Doesn't everybody want to be happy."],
    answer: 0,
    explanation: "'Everybody' changes to 'Who doesn't + base verb?': 'Who doesn't want to be happy?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Friendship is nothing but a name.",
    prompt: "Change into Interrogative (SSC):",
    options: ["What is friendship but a name?", "Is friendship anything but a name.", "Is friendship nothing but a name?", "What was friendship but a name?"],
    answer: 0,
    explanation: "'Subject + verb + nothing but' changes to 'What + verb + subject + but...?' : 'What is friendship but a name?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "None can deny the truth.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who can deny the truth?", "Can't anyone deny the truth?", "Who can't deny the truth?", "Can none deny the truth?"],
    answer: 0,
    explanation: "'None can' changes to 'Who can': 'Who can deny the truth?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "There is no use of this law.",
    prompt: "Change into Interrogative (SSC):",
    options: ["What is the use of this law?", "Is there no use of this law?", "Why is this law useful?", "Does there any use of this law?"],
    answer: 0,
    explanation: "'There is no use of...' changes to 'What is the use of...?' (or 'Is there any use of...?')"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "A patriot loves his country.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Doesn't a patriot love his country?", "Does a patriot love his country.", "Who loves his country?", "Is a patriot love his country?"],
    answer: 0,
    explanation: "Affirmative present with 3rd person singular takes 'Doesn't a patriot love his country?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Nothing can prevent him from going.",
    prompt: "Change into Interrogative (SSC):",
    options: ["What can prevent him from going?", "Can nothing prevent him from going?", "Can't anything prevent him from going?", "Does anything prevent him from going?"],
    answer: 0,
    explanation: "'Nothing' as subject becomes 'What' or 'Can anything...': 'What can prevent him from going?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Their sacrifice will never be forgotten.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Will their sacrifice ever be forgotten?", "Won't their sacrifice ever be forgotten?", "Will their sacrifice never be forgotten?", "Can their sacrifice ever be forgotten?"],
    answer: 0,
    explanation: "'will never' changes to 'Will... ever': 'Will their sacrifice ever be forgotten?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "We should respect our parents and teachers.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Shouldn't we respect our parents and teachers?", "Should we respect our parents and teachers.", "Do we respect our parents and teachers?", "Ought we respect our parents and teachers?"],
    answer: 0,
    explanation: "'We should' becomes 'Shouldn't we...?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Smoking is a very harmful habit.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Isn't smoking a very harmful habit?", "Is smoking a very harmful habit.", "Does smoking a very harmful habit?", "Was smoking a very harmful habit?"],
    answer: 0,
    explanation: "'is' becomes 'Isn't smoking a very harmful habit?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Everyone hates a corrupt person.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who doesn't hate a corrupt person?", "Who hates a corrupt person?", "Does everyone hate a corrupt person.", "Doesn't everyone hates a corrupt person."],
    answer: 0,
    explanation: "'Everyone' changes to 'Who doesn't hate a corrupt person?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "There is no man happier than he.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Is there any man happier than he?", "Who is not happier than he?", "There is any man happier than he?", "Does any man happier than he?"],
    answer: 0,
    explanation: "'There is no' becomes 'Is there any...?' or 'Who is happier than he?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Life is not a bed of roses.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Is life a bed of roses?", "Isn't life a bed of roses?", "Does life a bed of roses?", "Was life a bed of roses?"],
    answer: 0,
    explanation: "Negative assertive with 'is not' becomes affirmative question: 'Is life a bed of roses?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "A book introduces us to the realm of knowledge.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Doesn't a book introduce us to the realm of knowledge?", "Does a book introduces us to knowledge?", "Is a book introduce us to knowledge?", "Did a book introduce us to knowledge?"],
    answer: 0,
    explanation: "'introduces' uses 'Doesn't a book introduce...?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "He can never forget his childhood days.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Can he ever forget his childhood days?", "Can't he ever forget his childhood days?", "Does he ever forget his childhood days?", "Could he never forget his childhood days?"],
    answer: 0,
    explanation: "'can never' changes to 'Can he ever forget his childhood days?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "All hate a dishonest merchant.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who doesn't hate a dishonest merchant?", "Who hates a dishonest merchant?", "Do all hate a dishonest merchant.", "Does anyone hate a dishonest merchant?"],
    answer: 0,
    explanation: "'All' changes to 'Who doesn't...?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Money cannot buy true happiness.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Can money buy true happiness?", "Can't money buy true happiness?", "Does money buy true happiness?", "Can money buy no happiness?"],
    answer: 0,
    explanation: "'cannot' becomes affirmative question: 'Can money buy true happiness?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Early rising is good for health.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Isn't early rising good for health?", "Is early rising good for health.", "Does early rising good for health?", "Was early rising good for health?"],
    answer: 0,
    explanation: "'is' becomes 'Isn't early rising good for health?'"
  },
  {
    level: "ssc",
    type: "assertive_to_interrogative",
    sentence: "Nobody can avoid the consequences of his deeds.",
    prompt: "Change into Interrogative (SSC):",
    options: ["Who can avoid the consequences of his deeds?", "Can nobody avoid the consequences?", "Who can't avoid the consequences?", "Does anybody avoid consequences?"],
    answer: 0,
    explanation: "'Nobody can' becomes 'Who can avoid the consequences of his deeds?'"
  },

  // ==============================================================
  // LEVEL 2: SSC EXAM STANDARD (Interrogative ➔ Assertive)
  // ==============================================================
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Who trusts a notorious liar?",
    prompt: "Change into Assertive (SSC):",
    options: ["Nobody trusts a notorious liar.", "Everybody trusts a notorious liar.", "Anybody trusts a notorious liar.", "Someone trusts a notorious liar."],
    answer: 0,
    explanation: "'Who + affirmative verb' implies a negative assertion: 'Nobody trusts a notorious liar.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Who does not love motherland?",
    prompt: "Change into Assertive (SSC):",
    options: ["Everyone loves motherland.", "Nobody loves motherland.", "Anyone loves motherland.", "No one loves motherland."],
    answer: 0,
    explanation: "'Who does not...' becomes 'Everyone loves motherland.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "What is the use of this outdated rule?",
    prompt: "Change into Assertive (SSC):",
    options: ["There is no use of this outdated rule.", "There is some use of this outdated rule.", "The rule is of great use.", "Is there no use of this rule."],
    answer: 0,
    explanation: "'What is the use of...' becomes 'There is no use of this outdated rule.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Can anyone defeat time?",
    prompt: "Change into Assertive (SSC):",
    options: ["None can defeat time.", "Everyone can defeat time.", "Someone can defeat time.", "Anyone can defeat time."],
    answer: 0,
    explanation: "'Can anyone...?' becomes 'None can defeat time.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Can their heroic deeds ever be forgotten?",
    prompt: "Change into Assertive (SSC):",
    options: ["Their heroic deeds can never be forgotten.", "Their heroic deeds can ever be forgotten.", "Their heroic deeds cannot ever forgotten.", "Will their deeds never be forgotten."],
    answer: 0,
    explanation: "'Can... ever' becomes '... can never be forgotten.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Isn't honesty the best policy?",
    prompt: "Change into Assertive (SSC):",
    options: ["Honesty is the best policy.", "Honesty is not the best policy.", "Honesty was the best policy.", "Is honesty the best policy."],
    answer: 0,
    explanation: "Proverb: 'Honesty is the best policy.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "What is life but a walking shadow?",
    prompt: "Change into Assertive (SSC):",
    options: ["Life is nothing but a walking shadow.", "Life is everything but a shadow.", "Life is not a walking shadow.", "Life was nothing but shadow."],
    answer: 0,
    explanation: "'What is... but' becomes 'Life is nothing but a walking shadow.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Who wishes to live in misery?",
    prompt: "Change into Assertive (SSC):",
    options: ["No one wishes to live in misery.", "Everyone wishes to live in misery.", "Someone wishes to live in misery.", "Anyone wishes to live in misery."],
    answer: 0,
    explanation: "'Who wishes...' implies 'No one wishes to live in misery.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Isn't the earth round?",
    prompt: "Change into Assertive (SSC):",
    options: ["The earth is round.", "The earth was round.", "The earth is not round.", "Does the earth round."],
    answer: 0,
    explanation: "Universal truth: 'The earth is round.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Is gold a cheap metal?",
    prompt: "Change into Assertive (SSC):",
    options: ["Gold is not a cheap metal.", "Gold is a cheap metal.", "Gold was not cheap.", "Gold has not cheap."],
    answer: 0,
    explanation: "Affirmative question becomes negative statement: 'Gold is not a cheap metal.'"
  },
  {
    level: "ssc",
    type: "interrogative_to_assertive",
    sentence: "Does a student succeed without diligence?",
    prompt: "Change into Assertive (SSC):",
    options: ["A student does not succeed without diligence.", "A student succeeds without diligence.", "A student did not succeed without diligence.", "A student is not succeed without diligence."],
    answer: 0,
    explanation: "'Does... succeed...?' becomes 'A student does not succeed without diligence.'"
  },

  // ==============================================================
  // LEVEL 3: BCS & JOB EXAM STANDARD (Assertive ➔ Interrogative)
  // ==============================================================
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "Their glory can never fade.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["When can their glory fade?", "Can't their glory fade?", "Will their glory never fade?", "Where can their glory fade?"],
    answer: 0,
    explanation: "Classic BCS / Tennyson question: '...can never fade' transforms into 'When can their glory fade?' (or 'Can their glory ever fade?')"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "It does not matter if we lose the game.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["What though if we lose the game?", "Does it matter if we lose the game.", "Why does it matter if we lose?", "How does it matter if we lose the game?"],
    answer: 0,
    explanation: "'It does not matter if...' changes into 'What though if...?' (BCS standard rule)"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "It is no use crying over spilt milk.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Why cry over spilt milk?", "Is it no use crying over spilt milk?", "What is use of crying over spilt milk?", "How to cry over spilt milk?"],
    answer: 0,
    explanation: "'It is no use + gerund' changes to 'Why + base verb...?' or 'Is it any use crying over spilt milk?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "Nothing can prevent me from doing my duty.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["What can prevent me from doing my duty?", "Can nothing prevent me from doing my duty?", "Can't anything prevent me from my duty?", "Does anything prevent my duty?"],
    answer: 0,
    explanation: "'Nothing can prevent' changes to 'What can prevent me from doing my duty?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "There is no substitute for hard work.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Is there any substitute for hard work?", "What is there substitute for hard work?", "Isn't there any substitute for hard work?", "Does hard work have no substitute?"],
    answer: 0,
    explanation: "'There is no' becomes 'Is there any substitute for hard work?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "None can avoid inevitable death.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Who can avoid inevitable death?", "Can't anyone avoid inevitable death?", "Does anyone avoid death?", "Who avoids inevitable death?"],
    answer: 0,
    explanation: "'None can' becomes 'Who can avoid inevitable death?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "You had better leave this place immediately.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Hadn't you better leave this place immediately?", "Did you had better leave this place?", "Had you leave this place immediately?", "Should you better leave this place?"],
    answer: 0,
    explanation: "'had better' forms interrogative with 'Hadn't you better...?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "Man can never escape his destiny.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Can man ever escape his destiny?", "When can man escape his destiny?", "Can't man ever escape his destiny?", "Could man escape his destiny?"],
    answer: 0,
    explanation: "'can never' changes into 'Can... ever escape his destiny?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "There is no smoke without fire.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Is there any smoke without fire?", "Isn't there any smoke without fire?", "What is smoke without fire?", "Why is there smoke without fire?"],
    answer: 0,
    explanation: "'There is no' changes to 'Is there any smoke without fire?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "Nothing succeeds like success.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Does anything succeed like success?", "What succeeds like success?", "Doesn't anything succeed like success?", "Can anything succeed like success?"],
    answer: 0,
    explanation: "'Nothing succeeds' changes to 'Does anything succeed like success?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "You need not go there alone.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Need you go there alone?", "Do you need to go there alone?", "Needn't you go there alone?", "Must you go there alone?"],
    answer: 0,
    explanation: "Modal 'need not' changes to affirmative semi-modal interrogative: 'Need you go there alone?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "Virtue has its own reward.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Hasn't virtue its own reward?", "Does virtue have no reward?", "Is virtue its own reward?", "Did virtue have reward?"],
    answer: 0,
    explanation: "'has' becomes 'Hasn't virtue its own reward?' or 'Doesn't virtue have its own reward?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "It matters little if we fail in the initial attempt.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Does it matter much if we fail in the initial attempt?", "What if we fail in the initial attempt?", "Doesn't it matter if we fail?", "How does it matter if we fail?"],
    answer: 0,
    explanation: "'It matters little' changes to 'Does it matter much...?' or 'What though...?'"
  },
  {
    level: "bcs",
    type: "assertive_to_interrogative",
    sentence: "None would countenance such gross injustice.",
    prompt: "Change into Interrogative (BCS Standard):",
    options: ["Who would countenance such gross injustice?", "Would none countenance injustice?", "Who wouldn't countenance such injustice?", "Does anyone countenance injustice?"],
    answer: 0,
    explanation: "'None would' transforms into 'Who would...?'"
  },

  // ==============================================================
  // LEVEL 3: BCS & JOB EXAM STANDARD (Interrogative ➔ Assertive)
  // ==============================================================
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "When can their glory fade?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["Their glory can never fade.", "Their glory can ever fade.", "Their glory cannot fade soon.", "Their glory would never fade."],
    answer: 0,
    explanation: "'When can... fade?' changes to negative assertion: 'Their glory can never fade.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "What though if we lose the match?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["It does not matter if we lose the match.", "It matters much if we lose the match.", "We will not lose the match.", "It is painful if we lose the match."],
    answer: 0,
    explanation: "'What though if...' converts into 'It does not matter if we lose the match.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Why cry over spilt milk?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["It is no use crying over spilt milk.", "There is some use crying over spilt milk.", "You should not cry over milk.", "Why should we cry over spilt milk."],
    answer: 0,
    explanation: "'Why + verb' converts to 'It is no use crying over spilt milk.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Who can touch the horizon?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["None can touch the horizon.", "Everyone can touch the horizon.", "Anyone can touch the horizon.", "Someone can touch the horizon."],
    answer: 0,
    explanation: "Rhetorical question: 'None can touch the horizon.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Is there any hope left for the corrupt?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["There is no hope left for the corrupt.", "There is hope left for the corrupt.", "Some hope is left for the corrupt.", "Hope is never left for the corrupt."],
    answer: 0,
    explanation: "'Is there any...' becomes 'There is no hope left for the corrupt.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Could I ever forget your timely help?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["I could never forget your timely help.", "I could ever forget your timely help.", "I cannot forget your timely help.", "I would never forget your help."],
    answer: 0,
    explanation: "'Could I ever' becomes 'I could never forget your timely help.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Dare he say this in front of the judge?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["He dare not say this in front of the judge.", "He dares say this in front of the judge.", "He did not dare say this.", "Does he dare not say this."],
    answer: 0,
    explanation: "'Dare he...' semi-modal question becomes negative: 'He dare not say this in front of the judge.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "What though the field be lost?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["It matters little though the field be lost.", "The field was not lost.", "It matters much that the field is lost.", "Why is the field lost."],
    answer: 0,
    explanation: "Milton's Paradise Lost / BCS standard: 'What though...' becomes 'It matters little though the field be lost.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Can anyone escape the cycle of birth and death?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["None can escape the cycle of birth and death.", "Everyone can escape the cycle of birth and death.", "Someone can escape death.", "Anyone can escape the cycle."],
    answer: 0,
    explanation: "'Can anyone escape...' becomes 'None can escape the cycle of birth and death.'"
  },
  {
    level: "bcs",
    type: "interrogative_to_assertive",
    sentence: "Is there any royal road to learning?",
    prompt: "Change into Assertive (BCS Standard):",
    options: ["There is no royal road to learning.", "There is a royal road to learning.", "Learning has a royal road.", "Is no royal road to learning."],
    answer: 0,
    explanation: "Proverb: 'There is no royal road to learning.'"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = rawQuestions;
}
