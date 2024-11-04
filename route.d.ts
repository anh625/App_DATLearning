type RootStackParamList = {
    signIn: undefined;
    signUp: undefined;
    forgetPassword: undefined;
    userInfo: undefined;
    historyExams: undefined;
    historyRewards: undefined;
    homerewards: undefined;
    inforewards: { name: string; image: string; price: number | undefined};
    myTabs: undefined;
};
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
declare module "*.png"