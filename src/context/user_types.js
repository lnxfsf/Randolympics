import i18next from 'i18next';


export const settingUserType = (user_type) => {



    switch (user_type) {
      case "AH":
        return i18next.t('userTypes.user_type1');
        
      case "GP":
        return i18next.t('userTypes.user_type2');
        
      case "NP":
        return i18next.t('userTypes.user_type3');
        
      case "EM":
        return i18next.t('userTypes.user_type4');
        
      case "ITM":
        return i18next.t('userTypes.user_type5');
        
      case "IME":
        return i18next.t('userTypes.user_type6'); // Note: Corrected from "ITM"
        
      case "MM":
        return i18next.t('userTypes.user_type7');
        
      case "SM":
        return i18next.t('userTypes.user_type8');
        
      case "VM":
        return i18next.t('userTypes.user_type9');
        
      case "LM":
        return i18next.t('userTypes.user_type10');
        
      case "RS":
        return i18next.t('userTypes.user_type11');
        
      default:
        return i18next.t('userTypes.user_type12');

        
    }
  };