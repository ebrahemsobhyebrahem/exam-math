// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAKn0IuT9fkbHV3IoKO9OA1eKaj8JdJivw",
    authDomain: "exam-3bb16.firebaseapp.com",
    projectId: "exam-3bb16",
    storageBucket: "exam-3bb16.appspot.com",
    messagingSenderId: "968150403246",
    appId: "1:968150403246:web:98fdbdd33e5ab58120053f",
    measurementId: "G-NL113P2D9P"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

document.getElementById('google-signin').onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            document.getElementById('result').innerText = `مرحبًا، ${user.displayName}`;
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('quiz').classList.remove('hidden');
        })
        .catch((error) => {
            console.error(error);
        });
};

document.getElementById('quiz-form').onsubmit = (e) => {
    e.preventDefault();
    const answer1 = document.getElementById('question1').value;
    // تحقق من الإجابات هنا
    const result = answer1 == '2' ? 'إجابة صحيحة' : 'إجابة خاطئة';
    // أرسل النتيجة عبر البريد الإلكتروني باستخدام Firebase Functions
    database.ref('results/' + auth.currentUser.uid).set({
        result: result,
        email: auth.currentUser.email,
    });
    alert(result);
};
