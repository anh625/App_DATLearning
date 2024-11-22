type RootStackParamList = {
    signIn: undefined;
    signUp: undefined;
    forgetPassword: undefined;
    userInfo: undefined;
    historyExams: { historyData: Historyexams[] } | undefined;
    historyRewards: undefined;
    homerewards: undefined;
    inforewards: { name: string; image: string; price: number | undefined};
    homegames: undefined;
    guides: undefined;
    ranks: undefined;
    myTabs: undefined;
    distionary: undefined;
};
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
declare module "*.png"