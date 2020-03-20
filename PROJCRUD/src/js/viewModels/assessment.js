define(['ojs/ojrouter'],function(Router){
    function appraisalViewModel(){
        var self=this;
        self.router = Router.rootInstance;
        console.log("router",self.router);
        self.ain = self.router.currentState().value.ain;
    }
    return appraisalViewModel;
});