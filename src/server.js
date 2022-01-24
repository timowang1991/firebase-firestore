const { collection, doc, getDoc, getDocs, setDoc, query, where } = require('firebase/firestore');
const { firestore } = require('./firebase');

async function addDocFunc() {
    try {
        const newUserDocRef = doc(firestore, 'dev/users/users', 'someone@gmail.com');
        await setDoc(newUserDocRef, {
            walletAddress: '0x01',
            gamebagAddress: '0x03'
        });
        console.log('newUserDocRef', newUserDocRef);

        const oneHourLater = new Date(new Date().getTime() + 3600 * 1000).toISOString();
        const fiveMinsLater = new Date(new Date().getTime() + 300 * 1000).toISOString();
        const newLoginPendingDocRef = doc(firestore, 'dev/users/loginPending', 'someone@gmail.com');

        await setDoc(newLoginPendingDocRef, {
            sendEmailAttempts: 0, // upper limit 5
            sendEmailAttemptsLockExpiry: oneHourLater,   // 1 hour later

            enterCodeAttempts: 0, // upper limit 5
            enterCodeAttemptsLockExpiry: oneHourLater,   // 1 hour later

            entryCode: '123456',
            entryCodeExpiry: fiveMinsLater  // 5 minutes later
        });
        console.log('newLoginPendingDocRef', newLoginPendingDocRef);
    } catch (error) {
        console.log('error', error);
    }
}

async function queryDocFunc() {
    const userDocRef = doc(firestore, 'dev/users/users', 'someone@gmail.com');
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        console.log('user doc data', userDoc.data());
    }

    const userCollectionRef = collection(firestore, 'dev/users/users');
    const q = query(userCollectionRef, where('walletAddress', '==', '0x01'));
    const userDocs = await getDocs(q);
    userDocs.forEach((userDoc) => {
        console.log(userDoc.id, '=>', userDoc.data());
    })
}

addDocFunc()
    .then(() => console.log('Done'));

queryDocFunc()
    .then(() => console.log('Done'));
