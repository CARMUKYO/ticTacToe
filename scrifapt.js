const personFactory = function(name){
    const one = 1;
    const sayHello = function(){
        console.log("hi");
    }
    return {sayHello , name};
}

const student = function(name){
    const {sayHello} = personFactory(name);
    const study = function(){
        console.log("studying");
    }
    return {study, sayHello};
}

const student1 = student("name");
console.log(person1.name)
person1.sayHello();
