function classifier(input) {

    if (!Array.isArray(input)) throw Error;
    if (!input.length)  return { noOfGroups: 0 };

    const students = input.map((element) => ({ ...element,age: (2019 - (new Date (element.dob)).getUTCFullYear())})).sort((a,b)=>a.age -b.age);
    let student= [students[0]];

    let studentGroup = [];

    for (let i = 1; i < students.length; i++) {
        if (students[i].age - student[0].age <= 5 && student.length <= 2) {
          student.push(students[i]);

        } else {
            studentGroup.push(student);

            student = [];
            student.push(students[i]);

        }
    }

    if (student.length) {
        studentGroup.push(student);
    }


    let result = {};
    result.noOfGroups = studentGroup.length;

    const outputRecord = studentGroup.map(function(student) {
        return {
            members: student.map((val) => ({ ...val })),
            oldest: student[student.length - 1].age,
            sum: student.reduce((age, val) => {
                return age + val.age;
            }, 0),
            regNos: student.map(val => (Number(val.regNo))).sort(function(a, b) {
                return a - b
            })
        };
    });

    outputRecord.forEach((student, idx) => {
        let currentGroup = `group${idx + 1}`;
        result = {...result, [currentGroup]: student };
    });
    return result;
}


export default classifier;
