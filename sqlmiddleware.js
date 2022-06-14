

module.exports={

    sqlInjectionDetector:(req,res,next)=>{
        let unclean = false;
        let errors = []

        var injection1 = /(\')|(--)|(#)|(=)|(;)/ig;

        var injection2 =/'(=)[^\n]*((\')|(--)|(;))'/ig;

        var injection3 =/'w*((\'))'/ig;

        var injection4 =/('(\'|\"|--)union)|('(\'|\"|--);union)|( union )|^(union)$/ig;

        var injection5 =/('(\'|\"|--)drop)|('(\'|\"|--);drop)|('(\'|\"|--); drop )$/ig;

        let info = Object.values(req.body);

         info.map((foo)=>{
        if( injection1.test(foo)||
            injection2.test(foo)||
            injection3.test(foo)||
            injection4.test(foo)||
            injection5.test(foo) ){

             console.log(foo)
             //send the errors where you want(your email, a seperate database ect)
                errors.push(foo)
                console.log(errors)
        unclean = true;
        }})
    if(unclean === true){
        res.status(403).json({
            error:'sql injection'
        });
    }else{
        next();
    }
   
 
}
}
