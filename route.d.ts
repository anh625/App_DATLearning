type RootStackParamList = {
    signIn: undefined;
    signUp: undefined;
    forgetPassword: undefined;
    userInfo: undefined;
    historyExams: undefined;
};
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
declare module "*.png"