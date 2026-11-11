var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libLang 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_getLanguage      		: 저장된 언어 설정을 조회하는 함수
 ● this.gfn_setLanguage      		: 선택 언어를 전역 변수 및 PrivateProfile에 저장하는 함수
 */


/**
 * @description     저장된 언어 설정을 조회하는 함수
 * @return          {String} 언어 코드 (KO, EN, ZH)
 */
pForm.gfn_getLanguage = function()
{
    // 언어 설정을 저장하는 PrivateProfile 키
    var sLanguageKey = "BES_DEV_LANGUAGE";

    // 이전에 선택한 언어 조회
    var sLanguage = nexacro.getPrivateProfile(sLanguageKey);

    // 저장된 언어가 없거나 지원하지 않는 언어이면 한국어 적용
    if (sLanguage != "KO" && sLanguage != "EN" && sLanguage != "ZH")
    {
        sLanguage = "KO";
    }

    // 유효한 언어 코드 반환
    return sLanguage;
};

/**
 * @description     선택 언어를 전역 변수 및 PrivateProfile에 저장하는 함수
 * @param           {sLanguage : String} 언어 코드 (KO, EN, ZH)
 * @return          {String} 최종 적용된 언어 코드
 */
pForm.gfn_setLanguage = function(sLanguage)
{
    // Application 전역 객체
    var objApp = nexacro.getApplication();

    // 지원하지 않는 언어이면 한국어 적용
    if (sLanguage != "KO" && sLanguage != "EN" && sLanguage != "ZH")
    {
        sLanguage = "KO";
    }

    // 공통 메시지 LIB에서 사용하는 전역 언어 코드
    objApp.gv_lang = sLanguage;

    // 기존 전역 언어 설정 유지
    objApp.languageCd = sLanguage;

    // IFC 방식과의 연계를 위한 언어 코드
    objApp.gv_languageType = sLanguage;

    // 이전 선택 언어를 PrivateProfile에 저장
    nexacro.setPrivateProfile("BES_DEV_LANGUAGE", sLanguage);

    // 최종 적용된 언어 코드 반환
    return sLanguage;
};
