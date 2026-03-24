/* main.js */

// 모듈 불러오기 ///////
// DOM함수 모듈
import dFn from "./dom.js";

// [ 메인페이지 콘텐츠1 4번째 영역에 도달한 경우 내용을 가로방향 이동하기 ]
// 이벤트 대상: window
// 이벤트 종류: scroll
// 위치대상: .tpg -> 스티키박스를 싸고있는 부모박스
const tpg = dFn.qs(".con1");
// 움직일대상: .slidePg>ul
const target = dFn.qs(".slidePg>ul");
// 고정시키는 마지막대상 : .slidePg .search-wrap
const searchSlide = dFn.qs(".slidePg .search-card");

// 광휠상태변수(0-허용,1-금지)
let stsWheel = 0;
// 휠제어시간
const TIME_WHEEL = 100;
// 휠단위수 (휠할때 증감하는수)
let numWheel = 0;

let winH = window.innerHeight;

// 윈도우 이벤트 걸기
dFn.addEvt(window, "scroll", moveSlide);

function moveSlide() {

    // 0. 휠이벤트 발생수 조절하기(광휠금지)
    if(stsWheel) return; // 막기
    stsWheel = 1; // 잠금!
    setTimeout(()=>stsWheel=0,TIME_WHEEL); // 해제

    // 1. 스티키 부모박스 바운딩top값
    let bTop = dFn.getBCR(tpg);
    // console.log('나야나!',bTop);

    // 2. 바운딩값으로  대상 left위치 변경하기
    // 움직일대상: 스티키박스 -> .slidePg>ul

    // (1) 윗쪽(0초과)일때 처음위치 재설정하기
    if (bTop > 0) {
        target.style.left = "0px";
    }
    // (2) 움직이기시작은 바운딩값이 0이하일때부터!!!
    // 한계는 -1600px
    else if (bTop <= 0 && bTop >= -winH*1.6) {
        target.style.left = bTop + "px";
    }
    else if (bTop < -winH*1.6 && bTop > -winH*2) {
        searchSlide.classList.remove('on');
    }
    else if (bTop <= -winH*2 && bTop >= -winH*2.5) {
        searchSlide.classList.add('on');
    }
    // (3) 마지막 한계 이후엔 한계값으로 셋팅!
    else {
        target.style.left =  -winH*2.5+"px";
    }
    
} //////////// moveSlide 함수 //////////////
///////////////////////////////////////////////////////////



// 메인 비주얼 슬라이드
const mainVisualSwiper = new Swiper(".mainVisual", {
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    effect: "fade",
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: ".mainVisual .swiper-pagination",
        clickable: true,
    },
});

// 콘텐츠1 모바일 슬라이드
const productSwiper = new Swiper(".product-list", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".product-list .swiper-pagination",
        clickable: true,
    },
});

// 뉴스 이미지 영역 슬라이드
const newsImgSwiper = new Swiper(".news-slide", {
    autoplay: {
        delay: 1200,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".con4 .swiper-pagination",
        clickable: true,
    },
    speed: 5000,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    breakpoints: {
        681: {
            slidesPerView: 2.5,
            spaceBetween: 25,
            speed: 3500,
        },
        1200: {
            slidesPerView: 3.7,
            spaceBetween: 50,
        }
    }
});



// 벽지컬렉션 슬라이드
const collectionSlide = new Swiper(".con2-slide", {
    effect: "fade",
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: ".con2-slide .swiper-pagination",
        clickable: true,
    },
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
});

// 벽지컬렉션 탭버튼
const samData = {"실크벽지":1,"합지벽지":3,"방염벽지":6}
const seqSam = Object.keys(samData);

const samList = dFn.qsa(".sample-list button");
// let pgBullet = dFn.qsa(".con2-slide .swiper-pagination-bullet");

samList.forEach((ele)=>{
    ele.onclick=()=>{
        let txt = ele.innerText;
        console.log(txt);

        // 스와이퍼 슬라이드 이동 메서드 slideTo(인데스번호)
        collectionSlide.slideTo(samData[txt]);

        // on 넣기
        ele.parentElement.classList.add('on');
        // console.log(ele.parentElement.parentElement.querySelectorAll('li'));
        ele.parentElement.parentElement.querySelectorAll('li')
        .forEach(el=>{
            // console.log(el.isSameNode(ele.parentElement));
            if(!el.isSameNode(ele.parentElement))
                el.classList.remove('on')
        });
        
    }
})