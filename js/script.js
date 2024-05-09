// typing animation
var typed = new Typed('.typing', {
    strings: ['', 'Web Developer', 'Web Designer', 'Freelancer'],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true,
});

// Aside
const nav = document.querySelector('.nav'),
    navList = nav.querySelectorAll('li'),
    totalNavList = navList.length;
allSection = document.querySelectorAll('section');
totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');

    a.addEventListener('click', function () {
        removeBackSection();

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                addBackSection(j);
                // allSection[j].classList.add('back-section');
            }
            navList[j].querySelector('a').classList.remove('active');
        }
        this.classList.add('active');
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function addBackSection(num) {
    allSection[num].classList.add('back-section');
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }
    const target = element.getAttribute('href').split('#')[1];
    document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}
document.querySelector('.hire-me').addEventListener('click', function () {
    const sectionIndex = this.getAttribute('data-section-index');

    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

const navTogglerBtn = document.querySelector('.nav-toggler'),
    aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => {
    asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}
// 
function onBtnClickSendMail() {
    var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(document.getElementById('email_id').value)) {
        document.getElementById('email_id').style.borderColor = 'red';
    } else {
        document.getElementById('email_id').style.borderColor = 'green';
        sendMail();
    }
}

// send email
function sendMail() {
    var params = {
        from_name: document.getElementById('from_name').value,
        email_id: document.getElementById('email_id').value,
        message: document.getElementById('message').value,
    };
    emailjs.send('service_48b0gyq', 'template_4d2wwti', params).then(function (res) {
        Swal.fire({
            position: 'start',
            icon: 'success',
            title: 'Email Sent Successfully',
            showConfirmButton: false,
            timer: 1800,
        });
    });
    // Clear the input fields after sending the email
    document.getElementById('from_name').value = '';
    document.getElementById('email_id').value = '';
    document.getElementById('message').value = '';
    // Reset the border color
    document.getElementById('email_id').style.borderColor = '';
}
