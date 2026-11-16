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
 ● this.gfn_getCurrentLanguage   	: 현재 적용 중인 언어 코드를 조회하는 함수
 ● this.gfn_getLanguageInfo      	: 언어 코드의 표시명과 국기 이미지를 조회하는 함수
 ● this._gfn_isLanguage          	: 지원 언어 코드 여부를 확인하는 함수 (KO, EN, ZH, JA, OT)
 */


/**
 * @description     지원 언어 코드 여부를 확인하는 함수 (라이브러리 내부용)
 *                  - 지원 언어 : KO(한국어), EN(영어), ZH(중국어), JA(일본어), OT(기타)
 *                  - 언어를 추가할 때는 이 함수와 gfn_getLanguageInfo 두 곳만 수정
 * @param           {sLanguage : String} 언어 코드
 * @return          {Boolean} true(지원 언어), false(미지원 언어)
 * @example         if (!this._gfn_isLanguage(sLanguage)) sLanguage = "KO";
 */
pForm._gfn_isLanguage = function(sLanguage)
{
    var arrLanguage = ["KO", "EN", "ZH", "JA", "OT"];

    return arrLanguage.indexOf(sLanguage) >= 0;
};

/**
 * @description     저장된 언어 설정을 조회하는 함수
 * @return          {String} 언어 코드 (KO, EN, ZH, JA, OT)
 */
pForm.gfn_getLanguage = function()
{
    // 언어 설정을 저장하는 PrivateProfile 키
    var sLanguageKey = "BES_DEV_LANGUAGE";

    // 이전에 선택한 언어 조회
    var sLanguage = nexacro.getPrivateProfile(sLanguageKey);

    // 저장된 언어가 없거나 지원하지 않는 언어이면 한국어 적용
    if (!this._gfn_isLanguage(sLanguage))
    {
        sLanguage = "KO";
    }

    // 유효한 언어 코드 반환
    return sLanguage;
};

/**
 * @description     선택 언어를 전역 변수 및 PrivateProfile에 저장하는 함수
 * @param           {sLanguage : String} 언어 코드 (KO, EN, ZH, JA, OT)
 * @return          {String} 최종 적용된 언어 코드
 */
pForm.gfn_setLanguage = function(sLanguage)
{
    // Application 전역 객체
    var objApp = nexacro.getApplication();

    // 지원하지 않는 언어이면 한국어 적용
    if (!this._gfn_isLanguage(sLanguage))
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

/**
 * @description     현재 적용 중인 언어 코드를 조회하는 함수
 *                  - 로그인에서 설정한 전역 언어(gv_lang) 우선, 없으면 저장된 언어
 * @return          {String} 언어 코드 (KO, EN, ZH, JA, OT)
 */
pForm.gfn_getCurrentLanguage = function()
{
    var sLanguage = nexacro.getApplication().gv_lang;

    if (!this._gfn_isLanguage(sLanguage))
    {
        sLanguage = this.gfn_getLanguage();
    }

    return sLanguage;
};

/**
 * @description     언어 코드의 표시명과 국기 이미지를 조회하는 함수
 * @param           {sLanguage : String} 언어 코드 (KO, EN, ZH, JA, OT)
 * @return          {Object} { code, name, flag } (지원하지 않는 언어는 한국어)
 */
pForm.gfn_getLanguageInfo = function(sLanguage)
{
    var objLanguageInfo = {
          "KO" : { code : "KO", name : "한국어/KR", flag : "theme://bes_icon/img_TF_kr.png" }
        , "EN" : { code : "EN", name : "영어/EN"  , flag : "theme://bes_icon/img_TF_en.png" }
        , "ZH" : { code : "ZH", name : "중국어/CN", flag : "theme://bes_icon/img_TF_cn.png" }
        , "JA" : { code : "JA", name : "일본어/JP", flag : "theme://bes_icon/img_TF_jp.png" }
        , "OT" : { code : "OT", name : "기타/OT"  , flag : "theme://bes_icon/img_TF_ot.png" }
    };

    return objLanguageInfo[sLanguage] || objLanguageInfo["KO"];
};
