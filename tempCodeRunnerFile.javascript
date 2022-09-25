//factory function
function createCourse(title){
    return {
        title:title,
        notes:{
            intro: "welcome to javascript"
        },
        enroll() {
            console.log("you are sucessfully enrolled in the course");

        },
        price:999

    }
}
const newCourse= createCourse("javascript")
//construction function
function Course(title){
    this.title=title,
    this.enroll = function enroll(){
        console.log("you are sucessfully enrolled in the course");
    }
}

const jsCourse= new Course("javascript")
Course.enroll