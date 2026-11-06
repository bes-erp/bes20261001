<?xml version="1.0" encoding="utf-8"?>
<Script version="1.0" type="xscript5.1"><![CDATA[var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Language 관련 공통 함수
 ===============================================================================
 ● this.gfn_getLanguageCd    : 언어 코드를 공통 메시지 언어 코드로 변환
 ● this.gfn_getLanguage      : 저장된 언어 설정 조회
 ● this.gfn_setLanguage      : 선택 언어를 전역 변수 및 PrivateProfile에 저장
 */


/**
 * @description     Nexacro 언어 코드를 BES 공통 메시지 언어 코드로 변환
 * @param           {sLanguage : String} 언어 코드 (ko-KR, en-US, zh-CN)
 * @return          {String} 공통 메시지 언어 코드 (KO, EN, ZH)
 */
pForm.gfn_getLanguageCd = function(sLanguage)
{
    // 선택한 언어에 따른 공통 메시지 코드 반환
    switch (sLanguage)
    {
        // 영어
        case "en-US":
            return "EN";

        // 중국어
        case "zh-CN":
            return "ZH";

        // 한국어 및 지원하지 않는 언어
        default:
            return "KO";
    }
};


/**
 * @description     이전에 저장한 언어 설정 조회
 * @return          {String} 언어 코드 (ko-KR, en-US, zh-CN)
 */
pForm.gfn_getLanguage = function()
{
    // 언어 설정을 저장하는 PrivateProfile 키
    var sLanguageKey = "BES_DEV_LANGUAGE";

    // 이전에 선택한 언어 조회
    var sLanguage = nexacro.getPrivateProfile(sLanguageKey);

    // 저장된 언어가 없거나 지원하지 않는 언어이면 한국어 적용
    if (sLanguage != "ko-KR" && sLanguage != "en-US" && sLanguage != "zh-CN")
    {
        sLanguage = "ko-KR";
    }

    // 유효한 언어 코드 반환
    return sLanguage;
};


/**
 * @description     선택한 언어를 Application 전역 변수 및 PrivateProfile에 저장
 * @param           {sLanguage : String} 언어 코드 (ko-KR, en-US, zh-CN)
 * @return          {String} 최종 적용된 언어 코드
 */
pForm.gfn_setLanguage = function(sLanguage)
{
    // Application 전역 객체
    var objApp = nexacro.getApplication();

    // 지원하지 않는 언어이면 한국어 적용
    if (sLanguage != "ko-KR" && sLanguage != "en-US" && sLanguage != "zh-CN")
    {
        sLanguage = "ko-KR";
    }

    // 선택 언어를 공통 메시지 코드로 변환
    var sLanguageCd = this.gfn_getLanguageCd(sLanguage);

    // Application 전역 언어 설정
    objApp.languageCd = sLanguageCd;

    // IFC 방식과의 연계를 위한 언어 코드
    objApp.gv_languageType = sLanguage;

    // 이전 선택 언어를 PrivateProfile에 저장
    nexacro.setPrivateProfile("BES_DEV_LANGUAGE", sLanguage);

    // 최종 적용된 언어 코드 반환
    return sLanguage;
};
]]></Script>
