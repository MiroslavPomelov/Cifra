using HWOOP8;

Mark mark = new   Mark(5);
Exam exam = new    Exam("Math");
Facultet facultet = new Facultet("Economy", exam);
Abiturient    abiturient = new Abiturient("Ivanov V.V.",facultet);
Teacher teacher = new Teacher("Petrov A.A.", mark);
teacher.Print();
//facultet.ClaimAbiturient();

