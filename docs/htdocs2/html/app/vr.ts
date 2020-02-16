import { VRManager } from './VRManager.js';

window.addEventListener('load',()=> VRManager.Instance.Init() );

// 화면 스와이프시 호출
let f = function controlClick(obj:number){
    if (obj == 0) {
        // 스토리보드 클릭시 - GD 스토리 zone (영상)
		//location.href = '../html/story.html';
    }
    else if (obj == 1) {
        // 신발 클릭시 - 3D 제품 스토리 / DIY zone (커스텀)
		//location.href = '../html/custom.html';
    }
    else if (obj == 2) {
        // 백보드 - AR 미션 zone 
		//location.href = '../html/ar.html';
    }
    else if (obj == 3) {
        // 문클릭시 - 이벤트 zone (이벤트 설명)
    }
}


function OnIOS13Click() {
    $('.pop-guide').on('click', function()
    {
       VRManager.Instance.OnIOS13Click();
    });
}

VRManager.Instance.SetFunction(f);

// 입장하기 누르면 화면 확대
function OnClick()
{
    VRManager.Instance.OnClick();
}


// 터치 마우스 락
function TouchLock()
{
    VRManager.Instance.Lock();
}

// 터치 마우스 락풀음
function TouchUnLock()
{
    VRManager.Instance.UnLock();
}

