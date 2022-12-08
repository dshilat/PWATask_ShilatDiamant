window.addEventListener("DOMContentLoaded", function () {

    // מאזין לכפתור מציאת המיקום 
    document.getElementById("find-me").addEventListener("click", geoFindMe);

    const statusText = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const showMap = document.querySelector('#iframe');

    function geoFindMe() {
        mapLink.href = '';
        mapLink.textContent = '';

        // בדיקה האם קיים רכיב המיקום
        if (!navigator.geolocation) {
            // אין אפשרות לאתר מיקום
            statusText.textContent = 'לא נתמך';

        } else {
            // יש אפשרות - קיים הרכיב לאתר מיקום
            statusText.textContent = 'מבצע איתור מיקום';
            //קריאה לפונקציות הצלחה ושגיאה
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // הסרת המחלקה המסתירה את התגית
        document.getElementById("iframe").classList.remove("d-none");
        console.log(iframe);

        statusText.textContent = '';
        mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        showMap.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;


        // שיתוף
        const shareData = {
            title: 'שיעור 7',
            text: 'היי! בואו תראו את המיקום שלי',
            url: `https://maps.google.com/?q=${latitude},${longitude}`
        }

        // יצירת משתנה לכפתור לפי האיידי 
        const btnShare = document.querySelector('#shareBtn');
        // const resultPara = document.querySelector('.result');

        // Share must be triggered by "user activation"
        // אירוע לחיצה שמופעל בלחיצה על הכפתור 
        btnShare.addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
                console.log("שיתוף בוצע בהצלחה");
                // resultPara.textContent = 'MDN shared successfully';
            } catch (err) {
                console.log("שגיאה");
                console.log(`Error: ${err}`);
                // resultPara.textContent = `Error: ${err}`;
            }
        });
    }

    function error() {
        statusText.textContent = 'Unable to retrieve your location';
    }
})