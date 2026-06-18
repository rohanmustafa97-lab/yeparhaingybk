export const lessons = [
  {
    id: 'intro-to-oop',
    title: 'Introduction to OOP & Classes',
    description: 'Learn what Object-Oriented Programming is and how to create your first Python classes.',
    duration: '15 min',
  },
  {
    id: 'attributes-methods',
    title: 'Attributes and Methods',
    description: 'Understand instance attributes, methods, self, and class-level data.',
    duration: '18 min',
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    description: 'Master single, multiple, and multilevel inheritance with MRO and super().',
    duration: '22 min',
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    description: 'Explore method overriding, duck typing, and runtime polymorphism.',
    duration: '20 min',
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    description: 'Protect data with access conventions, getters, and setters.',
    duration: '16 min',
  },
  {
    id: 'abstraction',
    title: 'Abstraction',
    description: 'Use Abstract Base Classes and interfaces to define blueprints.',
    duration: '20 min',
  },
  {
    id: 'magic-methods',
    title: 'Magic Methods',
    description: 'Harness dunder methods like __str__, __repr__, __len__, and __eq__.',
    duration: '18 min',
  },
  {
    id: 'property-decorators',
    title: 'Property Decorators',
    description: 'Create elegant getters, setters, and deleters with @property.',
    duration: '15 min',
  },
  {
    id: 'class-static-methods',
    title: 'Class Methods & Static Methods',
    description: 'Learn when to use @classmethod and @staticmethod effectively.',
    duration: '16 min',
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Composition, design patterns, file handling, generics, decorators, and callbacks.',
    duration: '28 min',
  },
];

export const lessonContent = [
  {
    id: 'intro-to-oop',
    title: 'Introduction to OOP & Classes',
    description: 'Learn what Object-Oriented Programming is and how to create your first Python classes.',
    duration: '15 min',
    slides: [
      {
        title: 'What is Object-Oriented Programming?',
        content: `Object-Oriented Programming (OOP) is a programming paradigm that organizes code around **objects** rather than functions and logic alone.

Think of OOP like organizing a real-world system:
- A **class** is a blueprint (e.g., "Car design")
- An **object** is a real instance (e.g., "Your red Toyota")

**Why OOP matters:**
- **Reusability** — Write once, create many objects
- **Modularity** — Break complex systems into manageable pieces
- **Maintainability** — Changes in one class don't break everything
- **Real-world modeling** — Code mirrors how we think about the world

Python is a multi-paradigm language, but OOP is central to building scalable applications, from web APIs to data science pipelines.`,
      },
      {
        title: 'Classes and Objects',
        content: `A **class** defines the structure and behavior that objects will have. An **object** (also called an **instance**) is created from that class.

**Real-world analogy:** An architect's blueprint for a house is the class. Each actual house built from that blueprint is an object.

Key terminology:
- **Attributes** — Data stored in an object (name, age, balance)
- **Methods** — Functions that belong to an object (deposit, greet, calculate)
- **Instantiation** — The act of creating an object from a class`,
        code: `# Defining a class
class Dog:
    pass  # Empty class for now

# Creating objects (instantiation)
buddy = Dog()
max = Dog()

# Each object is independent
print(buddy)  # <__main__.Dog object at 0x...>
print(max)    # Different object in memory`,
      },
      {
        title: 'The __init__ Constructor',
        content: `The **__init__** method is a special method called automatically when you create a new object. It initializes the object's attributes.

**Think of it as:** The setup crew that prepares everything when a new object is born.

Every class that needs initial data should define __init__. The first parameter is always **self**, which refers to the current object instance.`,
        code: `class Student:
    def __init__(self, name, age):
        self.name = name    # Instance attribute
        self.age = age      # Instance attribute

    def introduce(self):
        return f"Hi, I'm {self.name}, {self.age} years old."

# Creating students
s1 = Student("Ali", 16)
s2 = Student("Sara", 17)

print(s1.introduce())  # Hi, I'm Ali, 16 years old
print(s2.introduce())  # Hi, I'm Sara, 17 years old`,
      },
      {
        title: 'Building a Real-World Class',
        content: `Let's build a **BankAccount** class that demonstrates core OOP concepts in a practical scenario.

This class will:
- Store account holder name and balance
- Allow deposits and withdrawals
- Display account information

Notice how data (attributes) and behavior (methods) are bundled together in one cohesive unit. This is the essence of encapsulation — we'll explore it deeper in a later lesson.`,
        code: `class BankAccount:
    def __init__(self, holder, balance=0):
        self.holder = holder
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return f"Deposited \${amount}. New balance: \${self.balance}"
        return "Invalid deposit amount"

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return f"Withdrew \${amount}. New balance: \${self.balance}"
        return "Insufficient funds or invalid amount"

    def __str__(self):
        return f"Account({self.holder}, \${self.balance})"

account = BankAccount("Ahmed", 1000)
print(account.deposit(500))
print(account.withdraw(200))
print(account)  # Account(Ahmed, $1300)`,
      },
      {
        title: 'OOP in Practice — Key Takeaways',
        content: `You've learned the foundation of OOP in Python:

1. **Classes** are blueprints; **objects** are instances
2. **__init__** initializes object state
3. **self** refers to the current instance
4. **Methods** define behavior; **attributes** store data

**When to use OOP:**
- Modeling entities with both data and behavior
- Building systems that will grow over time
- Creating reusable components

**Next up:** We'll dive deeper into attributes and methods, learning how to organize data and behavior within classes more effectively.`,
      },
    ],
    questions: [
      {
        question: 'A software team is building a library management system. They need to represent books with title, author, and ISBN, and allow checking if a book is available. What is the BEST OOP approach?',
        options: [
          'Create a Book class with attributes and an is_available() method',
          'Use a global dictionary for all books and separate functions',
          'Store book data in a text file without classes',
          'Create a new function for each book title',
        ],
        correctIndex: 0,
        explanation: 'A Book class bundles data (title, author, ISBN) with behavior (is_available) in one reusable blueprint — the core purpose of OOP.',
      },
      {
        question: 'Consider this code:\n\nclass Car:\n    def __init__(self, brand):\n        brand = brand\n\nWhat happens when you run car = Car("Toyota"); print(car.brand)?',
        options: [
          'AttributeError — self.brand was never assigned',
          'Prints "Toyota" correctly',
          'Prints None',
          'SyntaxError at class definition',
        ],
        correctIndex: 0,
        explanation: 'Without self.brand = brand, the parameter is a local variable that disappears after __init__ finishes. Always assign to self.attribute.',
      },
      {
        question: 'Your team creates 50 Employee objects from one Employee class. Each object has its own name and salary. This demonstrates which OOP benefit?',
        options: [
          'Reusability — one class definition, many independent instances',
          'Inheritance — each employee inherits from another',
          'Polymorphism — all employees behave differently at runtime',
          'Abstraction — employees are abstract concepts',
        ],
        correctIndex: 0,
        explanation: 'Creating multiple independent objects from a single class definition is the classic demonstration of OOP reusability.',
      },
    ],
  },
  {
    id: 'attributes-methods',
    title: 'Attributes and Methods',
    description: 'Understand instance attributes, methods, self, and class-level data.',
    duration: '18 min',
    slides: [
      {
        title: 'Instance Attributes',
        content: `**Instance attributes** are variables that belong to a specific object. Each instance has its own copy of these attributes.

They are typically set in __init__ using self:
- self.name = name
- self.age = age

**Key point:** Changing an attribute on one object does NOT affect other objects of the same class.`,
        code: `class Teacher:
    def __init__(self, name, subject):
        self.name = name
        self.subject = subject

t1 = Teacher("Mr. Ali", "Math")
t2 = Teacher("Ms. Khan", "Physics")

print(t1.name, t1.subject)  # Mr. Ali Math
print(t2.name, t2.subject)  # Ms. Khan Physics`,
      },
      {
        title: 'Instance Methods',
        content: `**Instance methods** are functions defined inside a class that operate on instance data. They always take **self** as the first parameter.

Methods can:
- Read and modify instance attributes
- Call other methods on the same object
- Return computed values

**Real-world analogy:** A remote control's buttons (methods) interact with the TV's current state (attributes).`,
        code: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def get_grade(self):
        if self.marks >= 90:
            return "A"
        elif self.marks >= 75:
            return "B"
        elif self.marks >= 60:
            return "C"
        return "F"

    def display(self):
        return f"{self.name}: {self.marks}% ({self.get_grade()})"

s = Student("Ahmed", 88)
print(s.display())  # Ahmed: 88% (B)`,
      },
      {
        title: 'Class Attributes',
        content: `**Class attributes** are shared by ALL instances of a class. They are defined directly on the class, not inside __init__.

Use class attributes for:
- Constants shared across instances
- Tracking how many objects were created
- Default values that apply to all instances

**Important:** Modifying a class attribute affects all instances (unless shadowed by an instance attribute).`,
        code: `class Student:
    school = "ABC Academy"  # Class attribute
    student_count = 0

    def __init__(self, name):
        self.name = name      # Instance attribute
        Student.student_count += 1

s1 = Student("Ali")
s2 = Student("Sara")

print(s1.school)           # ABC Academy
print(s2.school)           # ABC Academy
print(Student.student_count)  # 2`,
      },
      {
        title: 'Association Between Objects',
        content: `Objects can reference other objects, creating **associations**. This is a fundamental relationship in OOP where objects are connected but exist independently.

From Lecture 10: A Student is **associated** with a Teacher — they can exist independently, but one references the other.

Association types:
- **One-to-One** — One student, one advisor
- **One-to-Many** — One teacher, many students
- **Many-to-Many** — Many students, many courses`,
        code: `class Teacher:
    def __init__(self, name):
        self.name = name

class Student:
    def __init__(self, name, teacher):
        self.name = name
        self.teacher = teacher  # Association

t1 = Teacher("Mr. Ali")
s1 = Student("Ahmed", t1)
s2 = Student("Sara", t1)

print(s1.teacher.name)  # Mr. Ali
print(s2.teacher.name)  # Mr. Ali (same teacher)`,
      },
      {
        title: 'Attributes vs Methods — Summary',
        content: `**Attributes** store state; **methods** define behavior.

| Concept | Scope | Defined In |
|---------|-------|------------|
| Instance attribute | Per object | __init__ or methods via self |
| Class attribute | Shared | Class body |
| Instance method | Per object | Class body with self |

**Best practices:**
- Use descriptive attribute names
- Keep methods focused on one task
- Use class attributes sparingly for truly shared data
- Pass other objects as attributes to model relationships`,
      },
    ],
    questions: [
      {
        question: 'A Student class has class attribute school = "ABC" and instance attribute name. After creating 3 students, what does Student.student_count show if __init__ increments it?',
        options: [
          '3 — class attributes track shared state across all instances',
          '1 — only the last student counts',
          '0 — class attributes reset each time',
          'Error — class attributes cannot be modified',
        ],
        correctIndex: 0,
        explanation: 'Class attributes like student_count are shared across all instances. Incrementing in __init__ correctly tracks total objects created.',
      },
      {
        question: 'Scenario: A method calculate_total() tries to access self.price but __init__ never sets self.price. What is the fix?',
        options: [
          'Add self.price = price in __init__',
          'Remove self from the method',
          'Make price a global variable',
          'Rename calculate_total to price',
        ],
        correctIndex: 0,
        explanation: 'Instance attributes must be assigned via self in __init__ (or another method) before other methods can access them.',
      },
      {
        question: 'A Teacher object and Student object exist independently, but Student stores a reference to Teacher. This is an example of:',
        options: [
          'Association — objects connected but independently existing',
          'Inheritance — Student inherits from Teacher',
          'Composition — Student owns Teacher',
          'Encapsulation — Teacher is hidden inside Student',
        ],
        correctIndex: 0,
        explanation: 'Association means objects are linked (Student.teacher) but each can exist on its own — matching the Lecture 10 pattern.',
      },
    ],
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    description: 'Master single, multiple, and multilevel inheritance with MRO and super().',
    duration: '22 min',
    slides: [
      {
        title: 'Inheritance Concepts',
        content: `**Inheritance** allows a child class to acquire properties and methods from a parent class, promoting code reuse and establishing hierarchical relationships.

**IS-A relationship:** A Dog IS-A Animal, so Dog can inherit from Animal.

Benefits:
- **Code reuse** — Don't repeat parent functionality
- **Hierarchy** — Model real-world taxonomies
- **Extensibility** — Add new behavior in child classes`,
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def speak(self):  # Method overriding
        return f"{self.name} barks"

dog = Dog("Buddy")
print(dog.speak())  # Buddy barks`,
      },
      {
        title: 'Types of Inheritance',
        content: `Python supports multiple inheritance patterns:

1. **Single** — One child, one parent
2. **Multiple** — One child, multiple parents
3. **Multilevel** — Chain: Grandparent → Parent → Child
4. **Hierarchical** — Multiple children, one parent
5. **Hybrid** — Combination of multiple and multilevel`,
        code: `# Multiple Inheritance
class Flyable:
    def fly(self):
        return "Flying..."

class Swimmable:
    def swim(self):
        return "Swimming..."

class Duck(Flyable, Swimmable):
    def move(self):
        return f"{self.fly()} and {self.swim()}"

duck = Duck()
print(duck.move())  # Flying... and Swimming...`,
      },
      {
        title: 'Multilevel & Hierarchical Inheritance',
        content: `**Multilevel:** Features pass through a chain of classes.

**Hierarchical:** Multiple subclasses share one parent.

Both patterns are common in real systems — e.g., Vehicle → Car → SportsCar (multilevel), or Shape → Rectangle, Circle (hierarchical).`,
        code: `# Multilevel Inheritance
class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    def start(self):
        return "Engine started"

class Car(Vehicle):
    def honk(self):
        return "Beep beep!"

class SportsCar(Car):
    def turbo_boost(self):
        return "Turbo engaged!"

ferrari = SportsCar("Ferrari")
print(ferrari.start())       # From Vehicle
print(ferrari.honk())        # From Car
print(ferrari.turbo_boost()) # From SportsCar`,
      },
      {
        title: 'Method Overriding & super()',
        content: `**Method overriding** lets a child class provide its own implementation of a parent method.

**super()** calls the parent class method, enabling you to extend (not just replace) parent behavior.

Use super() in constructors to ensure parent initialization runs correctly.`,
        code: `class A:
    def __init__(self):
        print("Parent constructor")

class B(A):
    def __init__(self):
        super().__init__()  # Call parent __init__
        print("Child constructor")

obj = B()
# Output:
# Parent constructor
# Child constructor`,
      },
      {
        title: 'Method Resolution Order (MRO)',
        content: `**MRO** defines the order Python searches for methods in a class hierarchy. Python uses the **C3 linearization** algorithm.

Rules:
- Left-to-right order in multiple inheritance
- Child before parent
- No class appears twice

The **diamond problem** (class inheriting from two parents sharing a grandparent) is handled by MRO.`,
        code: `class A:
    def show(self):
        print("Class A")

class B(A):
    def show(self):
        print("Class B")

class C(A):
    def show(self):
        print("Class C")

class D(B, C):
    pass

obj = D()
obj.show()  # Class B (MRO: D → B → C → A)
print(D.__mro__)`,
      },
    ],
    questions: [
      {
        question: 'A game has classes Flyable, Swimmable, and Duck(Flyable, Swimmable). Duck needs both fly() and swim(). Which inheritance type is this?',
        options: [
          'Multiple inheritance — one child inherits from two parents',
          'Single inheritance — Duck only inherits from Flyable',
          'Multilevel inheritance — Flyable inherits from Swimmable',
          'Hierarchical inheritance — two Ducks share one parent',
        ],
        correctIndex: 0,
        explanation: 'When one class inherits from two or more parent classes simultaneously, it is multiple inheritance — exactly the Duck example from Lecture 9.',
      },
      {
        question: 'Given class D(B, C) where both B and C inherit from A, calling obj.show() prints "Class B". Why?',
        options: [
          'MRO searches B before C due to left-to-right order in D(B, C)',
          'B is always chosen over C randomly',
          'C is ignored in multiple inheritance',
          'A.show() is always called first',
        ],
        correctIndex: 0,
        explanation: 'Python MRO follows C3 linearization with left-to-right ordering. D → B → C → A, so B.show() is found first.',
      },
      {
        question: 'A child class __init__ must call the parent __init__ to properly initialize inherited attributes. What is the correct approach?',
        options: [
          'super().__init__() at the start of the child __init__',
          'Parent.__init__(self) is never needed in Python',
          'Copy all parent code into the child class',
          'Delete the parent __init__ method',
        ],
        correctIndex: 0,
        explanation: 'super().__init__() ensures parent initialization runs, setting up inherited attributes before the child adds its own.',
      },
    ],
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    description: 'Explore method overriding, duck typing, and runtime polymorphism.',
    duration: '20 min',
    slides: [
      {
        title: 'What is Polymorphism?',
        content: `**Polymorphism** means "many forms." The same interface can behave differently depending on the object using it.

Types in Python:
- **Method overriding** — Child redefines parent method
- **Operator overloading** — Operators work differently per type
- **Duck typing** — "If it walks like a duck and quacks like a duck..."
- **Function polymorphism** — Same function works with different types`,
      },
      {
        title: 'Method Overriding & Duck Typing',
        content: `**Method overriding** gives each subclass its own version of a shared method name.

**Duck typing** — Python doesn't check the object's type. It only checks if the required method exists.`,
        code: `class Duck:
    def speak(self):
        print("Quack Quack")

class Dog:
    def speak(self):
        print("Woof Woof")

def animal_sound(animal):
    animal.speak()  # Duck typing — only needs speak()

animal_sound(Duck())
animal_sound(Dog())`,
      },
      {
        title: 'Operator Overloading',
        content: `Python operators behave differently with different types — this is built-in polymorphism.

- \`+\` adds integers OR concatenates strings
- \`*\` multiplies numbers OR repeats strings
- \`len()\` works on strings, lists, tuples, and custom objects (with __len__)

You can customize operator behavior in your classes using magic methods.`,
        code: `print(5 + 3)              # 8 (addition)
print("Hello " + "World")   # Hello World (concatenation)
print(4 * 2)                # 8 (multiplication)
print("Hi " * 3)            # Hi Hi Hi (repetition)

print(len("Computer"))      # 8
print(len([1, 2, 3, 4]))    # 4`,
      },
      {
        title: 'Polymorphism Through Inheritance',
        content: `Polymorphism shines when you process a collection of different subclasses through a parent interface.`,
        code: `class Shape:
    def draw(self):
        print("Drawing Shape")

class Circle(Shape):
    def draw(self):
        print("Drawing Circle")

class Rectangle(Shape):
    def draw(self):
        print("Drawing Rectangle")

shapes = [Circle(), Rectangle()]
for s in shapes:
    s.draw()
# Drawing Circle
# Drawing Rectangle`,
      },
      {
        title: 'Static vs Dynamic Binding',
        content: `**Static binding** — Method resolved at compile time (predictable, faster).

**Dynamic binding** — Method resolved at runtime (flexible, enables polymorphism).

Python is **dynamically typed** and uses **dynamic binding** for method calls. At runtime, Python determines which version of a method to execute based on the actual object type.

This is the foundation of runtime polymorphism — the same line of code produces different behavior depending on the object.`,
        code: `class Animal:
    def sound(self):
        print("Animal sound")

class Dog(Animal):
    def sound(self):
        print("Dog barks")

class Cat(Animal):
    def sound(self):
        print("Cat meows")

animals = [Dog(), Cat()]
for a in animals:
    a.sound()  # Dynamic binding decides at runtime`,
      },
    ],
    questions: [
      {
        question: 'A function process(animal) calls animal.speak() and works with Duck, Dog, and Cat objects. This is an example of:',
        options: [
          'Duck typing — behavior matters, not the class type',
          'Static binding — resolved at compile time',
          'Single inheritance — all animals inherit from one class',
          'Encapsulation — speak() is private',
        ],
        correctIndex: 0,
        explanation: 'Duck typing checks only whether the object has the required method (speak), not whether it inherits from a specific class.',
      },
      {
        question: 'Given shapes = [Circle(), Rectangle()] and a loop calling s.draw(), why does each print differently?',
        options: [
          'Dynamic binding resolves the correct draw() at runtime based on actual object type',
          'Python randomly picks a draw method',
          'Both always call Shape.draw()',
          'draw() is statically bound at definition time',
        ],
        correctIndex: 0,
        explanation: 'Dynamic binding means Python looks up the method on the actual object type at runtime — Circle.draw() vs Rectangle.draw().',
      },
      {
        question: 'print("Hi " * 3) outputs "Hi Hi Hi" while print(4 * 2) outputs 8. This demonstrates:',
        options: [
          'Operator overloading — same operator, different behavior per type',
          'Method overriding in built-in types',
          'Duck typing with multiplication',
          'Static binding of the * operator',
        ],
        correctIndex: 0,
        explanation: 'The * operator is polymorphic: it multiplies integers but repeats strings — classic operator overloading.',
      },
    ],
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    description: 'Protect data with access conventions, getters, and setters.',
    duration: '16 min',
    slides: [
      {
        title: 'What is Encapsulation?',
        content: `**Encapsulation** bundles data and methods together while controlling access to internal state.

Goals:
- **Protect data** from invalid modifications
- **Hide implementation details** from users of the class
- **Provide controlled access** through public methods

Python follows the philosophy: *"We are all consenting adults here"* — it uses conventions rather than strict access modifiers.`,
      },
      {
        title: 'Access Conventions in Python',
        content: `Python uses naming conventions for access levels:

| Convention | Meaning | Example |
|------------|---------|---------|
| name | Public | self.balance |
| _name | Protected (by convention) | self._balance |
| __name | Name mangling (private-ish) | self.__balance |

**Name mangling:** Python renames __balance to _ClassName__balance, making accidental access harder.`,
        code: `class BankAccount:
    def __init__(self, holder, balance):
        self.holder = holder      # Public
        self._balance = balance   # Protected convention
        self.__pin = "1234"       # Name-mangled

    def get_balance(self):
        return self._balance

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount`,
      },
      {
        title: 'Getters and Setters',
        content: `**Getters** and **setters** provide controlled access to private data, allowing validation before reading or writing.

This pattern is essential when:
- Values need validation (no negative salary)
- You want to log changes
- Internal representation differs from external interface`,
        code: `class Employee:
    def __init__(self, name, salary):
        self._name = name
        self._salary = salary

    def get_salary(self):
        return self._salary

    def set_salary(self, amount):
        if amount < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = amount

emp = Employee("Ali", 50000)
emp.set_salary(55000)
print(emp.get_salary())  # 55000`,
      },
      {
        title: 'Pythonic Access Control',
        content: `From Lecture 10: Python achieves controlled collaboration through:

- **Naming conventions** (_protected, __private)
- **Composition** — objects work together without exposing internals
- **Getter/setter methods** — controlled access points
- **Inner collaboration** — related classes cooperate through defined interfaces

Unlike C++'s \`friend\` keyword, Python trusts developers to respect conventions while providing tools when needed.`,
      },
      {
        title: 'Encapsulation Best Practices',
        content: `**When to encapsulate:**
- Financial data (balances, salaries)
- Security-sensitive fields (passwords, tokens)
- Fields with validation rules

**Best practices:**
- Start with public attributes; encapsulate when needed
- Use _prefix for "internal use" signals
- Use __prefix only when name collisions are a concern
- Prefer @property over manual getters/setters (next lessons!)

Encapsulation + validation = robust, maintainable classes.`,
      },
    ],
    questions: [
      {
        question: 'A BankAccount class allows account.balance = -5000 directly, causing invalid state. What is the BEST fix?',
        options: [
          'Use _balance with a setter that rejects negative values',
          'Delete the balance attribute entirely',
          'Make balance a global variable',
          'Add a print statement in __init__',
        ],
        correctIndex: 0,
        explanation: 'Encapsulation with a validated setter prevents invalid state while still allowing controlled modifications.',
      },
      {
        question: 'What does Python name mangling do to self.__pin inside class BankAccount?',
        options: [
          'Renames it to _BankAccount__pin, making direct access harder',
          'Deletes the attribute from memory',
          'Makes it accessible from any class',
          'Encrypts the value automatically',
        ],
        correctIndex: 0,
        explanation: 'Python mangles __pin to _ClassName__pin. It is not truly private but discourages accidental external access.',
      },
      {
        question: 'Python uses "We are all consenting adults" instead of strict private keywords. What does this mean practically?',
        options: [
          'Conventions like _ and __ guide access, but enforcement is by agreement',
          'All attributes are always public with no conventions',
          'Private attributes are impossible in Python',
          'Only __init__ can access instance attributes',
        ],
        correctIndex: 0,
        explanation: 'Python relies on naming conventions and developer discipline rather than compiler-enforced access control.',
      },
    ],
  },
  {
    id: 'abstraction',
    title: 'Abstraction',
    description: 'Use Abstract Base Classes and interfaces to define blueprints.',
    duration: '20 min',
    slides: [
      {
        title: 'Abstract Base Classes (ABC)',
        content: `An **Abstract Base Class** cannot be instantiated directly. It serves as a **blueprint** defining required methods for child classes.

From Lecture 13: Import from the abc module:
\`from abc import ABC, abstractmethod\`

Why use ABCs?
- Enforce method implementation in subclasses
- Provide common design structure
- Support polymorphism with guaranteed interfaces`,
        code: `from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

class Dog(Animal):
    def sound(self):
        print("Dog barks")

d = Dog()
d.sound()  # Dog barks`,
      },
      {
        title: 'Enforcing Implementation',
        content: `If a child class fails to implement all abstract methods, Python raises a **TypeError** at instantiation time.

This catches design errors early — before the program runs into missing method bugs.`,
        code: `from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass

class Car(Vehicle):
    pass  # Missing start() implementation

# c = Car()  # TypeError: Can't instantiate abstract class Car`,
      },
      {
        title: 'Abstract + Concrete Methods',
        content: `Abstract classes can contain both **abstract methods** (must be overridden) and **concrete methods** (inherited as-is).

This lets you share common functionality while still requiring specific implementations.`,
        code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    def display(self):
        print("This is a shape")

class Rectangle(Shape):
    def area(self):
        return 10 * 5

r = Rectangle()
r.display()       # This is a shape
print(r.area())   # 50`,
      },
      {
        title: 'Interfaces & Virtual Methods',
        content: `An **interface** defines what methods a class must have without full implementation. In Python, interfaces are created using ABC with @abstractmethod.

**Virtual methods** in Python are methods that can be overridden in child classes. All methods are virtual by default.

**Behavioral Substitution Principle (LSP):** A child object should be usable wherever a parent is expected without breaking the program.`,
        code: `from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def pay(self):
        pass

class CreditCard(Payment):
    def pay(self):
        print("Payment by Credit Card")

class PayPal(Payment):
    def pay(self):
        print("Payment by PayPal")

payments = [CreditCard(), PayPal()]
for p in payments:
    p.pay()`,
      },
      {
        title: 'LSP — Correct vs Incorrect Design',
        content: `**Correct substitution:** Sparrow can replace Bird because it supports expected behavior.

**Incorrect substitution:** Penguin inherits Bird.fly() but raises an exception — violating LSP.

**Better design:** Separate FlyingBird from Bird. Penguin gets swim() instead of a broken fly().

Abstraction + LSP = safer, more maintainable inheritance hierarchies.`,
        code: `# BAD: Penguin violates LSP
class Bird:
    def fly(self):
        print("Bird flies")

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins cannot fly")

# GOOD: Separate capabilities
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        print("Flying")

class Penguin(Bird):
    def swim(self):
        print("Swimming")`,
      },
    ],
    questions: [
      {
        question: 'A team creates class Car(Vehicle) but forgets to implement the abstract start() method. What happens?',
        options: [
          'TypeError when trying to instantiate Car',
          'Car works fine with a default start()',
          'Python auto-generates start()',
          'Only a warning is printed',
        ],
        correctIndex: 0,
        explanation: 'ABC enforces implementation — instantiating a subclass with unimplemented abstract methods raises TypeError.',
      },
      {
        question: 'Penguin inherits Bird with fly() but raises an exception in fly(). This violates:',
        options: [
          'Behavioral Substitution Principle — child breaks parent contract',
          'Duck typing — Penguin cannot quack',
          'Encapsulation — fly() is too public',
          'MRO — diamond problem in Bird hierarchy',
        ],
        correctIndex: 0,
        explanation: 'LSP requires child objects to fulfill the parent contract. A Penguin that cannot fly should not inherit fly().',
      },
      {
        question: 'An abstract class Shape has abstract area() and concrete display(). A Rectangle subclass must:',
        options: [
          'Implement area() but inherits display() automatically',
          'Implement both area() and display()',
          'Implement display() but not area()',
          'Implement neither — abstract classes provide both',
        ],
        correctIndex: 0,
        explanation: 'Only abstract methods must be implemented. Concrete methods in the parent are inherited as-is.',
      },
    ],
  },
  {
    id: 'magic-methods',
    title: 'Magic Methods',
    description: 'Harness dunder methods like __str__, __repr__, __len__, and __eq__.',
    duration: '18 min',
    slides: [
      {
        title: 'Introduction to Magic Methods',
        content: `**Magic methods** (dunder methods) are special methods with double underscores that Python calls automatically in certain situations.

They let your objects integrate with Python's built-in operations:
- Printing → __str__, __repr__
- Length → __len__
- Equality → __eq__
- Initialization → __init__

Mastering magic methods makes your classes feel like native Python types.`,
      },
      {
        title: '__str__ and __repr__',
        content: `**__str__** — Human-readable string (used by print() and str()).

**__repr__** — Unambiguous developer representation (used in debugger, should ideally be valid Python code).

Rule of thumb: __repr__ is for developers, __str__ is for users.`,
        code: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f'"{self.title}" by {self.author}'

    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"

b = Book("1984", "Orwell")
print(str(b))   # "1984" by Orwell
print(repr(b))  # Book('1984', 'Orwell')`,
      },
      {
        title: '__len__ and __eq__',
        content: `**__len__** — Called by len() function. Define it when your object has a meaningful "size."

**__eq__** — Called by == operator. Define it to compare objects by value rather than identity.`,
        code: `class Playlist:
    def __init__(self, name, songs):
        self.name = name
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __eq__(self, other):
        if not isinstance(other, Playlist):
            return False
        return self.name == other.name and self.songs == other.songs

p1 = Playlist("Favorites", ["Song A", "Song B"])
p2 = Playlist("Favorites", ["Song A", "Song B"])
print(len(p1))    # 2
print(p1 == p2)   # True`,
      },
      {
        title: '__dict__ — Object as Dictionary',
        content: `Every object has a **__dict__** attribute that stores its instance attributes as a dictionary. This is useful for serialization (as seen in Lecture 11 with JSON).`,
        code: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

s1 = Student("Ali", 85)
print(s1.__dict__)
# {'name': 'Ali', 'marks': 85}

# Used for JSON serialization
import json
json_data = json.dumps(s1.__dict__)
print(json_data)
# {"name": "Ali", "marks": 85}`,
      },
      {
        title: 'Magic Methods — Summary',
        content: `| Method | Triggered By | Purpose |
|--------|-------------|---------|
| __init__ | Object creation | Initialize attributes |
| __str__ | print(), str() | User-friendly display |
| __repr__ | repr(), debugger | Developer representation |
| __len__ | len() | Return "size" |
| __eq__ | == | Value equality |

Implement magic methods to make your classes intuitive and Pythonic.`,
      },
    ],
    questions: [
      {
        question: 'A Book class prints <__main__.Book object at 0x...> instead of the title. Which method should be added?',
        options: [
          '__str__ returning a readable format like "Title by Author"',
          '__init__ only — no other methods needed',
          '__len__ returning the page count',
          '__eq__ comparing two books',
        ],
        correctIndex: 0,
        explanation: '__str__ controls what print() displays. Without it, Python shows the default object representation.',
      },
      {
        question: 'Two Playlist objects with identical songs return False with ==. What is likely missing?',
        options: [
          '__eq__ method comparing name and songs',
          '__init__ method with more parameters',
          '__repr__ method',
          'A class attribute song_count',
        ],
        correctIndex: 0,
        explanation: 'Without __eq__, Python compares object identity (memory address). __eq__ enables value-based equality.',
      },
      {
        question: 'json.dumps(s1.__dict__) converts a Student object to JSON. What does __dict__ contain?',
        options: [
          'A dictionary of all instance attributes',
          'All methods of the class',
          'The class name only',
          'Binary serialized data',
        ],
        correctIndex: 0,
        explanation: '__dict__ maps attribute names to values — the standard way to serialize simple objects to JSON.',
      },
    ],
  },
  {
    id: 'property-decorators',
    title: 'Property Decorators',
    description: 'Create elegant getters, setters, and deleters with @property.',
    duration: '15 min',
    slides: [
      {
        title: 'The @property Decorator',
        content: `The **@property** decorator turns a method into a "getter" that is accessed like an attribute — no parentheses needed.

Benefits over manual get/set methods:
- Cleaner syntax: obj.name instead of obj.get_name()
- Can add validation later without changing the interface
- Pythonic and widely used in production code`,
        code: `class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

p = Person("Ali")
print(p.name)  # Ali (no parentheses!)`,
      },
      {
        title: 'Property Setters',
        content: `The **@name.setter** decorator defines what happens when a property is assigned a new value. This is where validation logic lives.`,
        code: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    @property
    def salary(self):
        return self._salary

    @salary.setter
    def salary(self, value):
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = value

emp = Employee("Sara", 50000)
emp.salary = 60000   # Uses setter
print(emp.salary)    # 60000`,
      },
      {
        title: 'Property Deleters',
        content: `The **@name.deleter** decorator controls what happens when \`del obj.name\` is called.

Use deleters when removing an attribute should trigger cleanup or validation.`,
        code: `class User:
    def __init__(self, email):
        self.email = email

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if "@" not in value:
            raise ValueError("Invalid email")
        self._email = value

    @email.deleter
    def email(self):
        print("Email removed")
        del self._email

u = User("ali@mail.com")
del u.email  # Email removed`,
      },
      {
        title: 'Property vs Manual Getters',
        content: `| Approach | Syntax | Validation | Pythonic |
|----------|--------|------------|----------|
| Manual getter/setter | obj.get_x() | Yes | Less |
| @property | obj.x | Yes | More |

**When to use @property:**
- Computed attributes (area from width × height)
- Validated assignments (non-negative prices)
- Lazy-loaded values (fetch on first access)

From Lecture 14: @property is listed alongside @staticmethod and @classmethod as a core Python decorator.`,
      },
    ],
    questions: [
      {
        question: 'An Employee class needs to reject negative salaries but allow emp.salary = 50000 syntax. What pattern fits best?',
        options: [
          '@property getter + @salary.setter with validation',
          'Public self.salary with no validation',
          'A global variable for salary',
          'Only __init__ can set salary',
        ],
        correctIndex: 0,
        explanation: '@property with a setter provides clean attribute syntax while validating on every assignment.',
      },
      {
        question: 'What is the difference between p.name (with @property) and p.get_name() (manual getter)?',
        options: [
          '@property allows attribute-style access without parentheses',
          '@property is slower and should be avoided',
          'Manual getters are required in Python 3',
          'There is no difference in behavior',
        ],
        correctIndex: 0,
        explanation: '@property makes a method callable as an attribute — cleaner API with the same encapsulation benefits.',
      },
      {
        question: 'A Circle class has radius with validation (must be > 0). Setting circle.radius = -5 should raise an error. Where does this logic go?',
        options: [
          'In the @radius.setter method',
          'In the @property getter only',
          'In __str__ method',
          'In a static method',
        ],
        correctIndex: 0,
        explanation: 'Setters run on assignment — the correct place to validate that radius is positive before storing.',
      },
    ],
  },
  {
    id: 'class-static-methods',
    title: 'Class Methods & Static Methods',
    description: 'Learn when to use @classmethod and @staticmethod effectively.',
    duration: '16 min',
    slides: [
      {
        title: 'Instance vs Class vs Static Methods',
        content: `Python provides three types of methods:

| Type | First Param | Accesses | Use Case |
|------|------------|----------|----------|
| Instance | self | Instance + class data | Object behavior |
| Class | cls | Class data only | Factory methods |
| Static | none | Neither | Utility functions |

Choosing the right type keeps your code organized and intention-revealing.`,
      },
      {
        title: '@classmethod',
        content: `**@classmethod** receives the class (cls) as the first argument instead of an instance.

Common uses:
- **Alternative constructors** (from_string, from_json)
- **Factory methods** that create instances
- Methods that need class-level data`,
        code: `class Student:
    school = "ABC Academy"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def show_school(cls):
        print(cls.school)

    @classmethod
    def from_birth_year(cls, name, birth_year):
        age = 2026 - birth_year
        return cls(name, age)

Student.show_school()
s = Student.from_birth_year("Ali", 2010)
print(s.name, s.age)  # Ali 16`,
      },
      {
        title: '@staticmethod',
        content: `**@staticmethod** doesn't receive self or cls. It's a regular function that lives inside a class for organizational purposes.

Use when:
- The function is related to the class but doesn't need instance or class data
- Utility functions that belong conceptually to the class`,
        code: `class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathUtils.add(5, 3))     # 8
print(MathUtils.is_even(4))    # True

# Can also call via instance
m = MathUtils()
print(m.add(10, 20))  # 30`,
      },
      {
        title: 'When to Use Which',
        content: `**Use instance methods** when you need to read or modify object state.

**Use @classmethod** when you need the class itself — especially for alternative constructors.

**Use @staticmethod** when the function is logically grouped with the class but needs no class or instance data.

From Lecture 14:
\`\`\`
class Math:
    @staticmethod
    def add(a, b):
        return a + b
\`\`\``,
        code: `class Date:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year

    @classmethod
    def from_string(cls, date_str):
        day, month, year = map(int, date_str.split("-"))
        return cls(day, month, year)

    @staticmethod
    def is_leap_year(year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

d = Date.from_string("18-06-2026")
print(Date.is_leap_year(2024))  # True`,
      },
    ],
    questions: [
      {
        question: 'A Date class needs Date.from_string("18-06-2026") as an alternative constructor. Which decorator is appropriate?',
        options: [
          '@classmethod — receives cls and returns cls(...)',
          '@staticmethod — no class or instance needed',
          'Regular instance method with self',
          '@property — for attribute access',
        ],
        correctIndex: 0,
        explanation: 'Alternative constructors are the classic @classmethod use case — cls is used to create and return a new instance.',
      },
      {
        question: 'MathUtils.is_even(n) checks if a number is even without accessing any class or instance data. Best implementation?',
        options: [
          '@staticmethod — utility function grouped with the class',
          '@classmethod — needs cls parameter',
          'Instance method — needs self',
          '@property — for attribute-style access',
        ],
        correctIndex: 0,
        explanation: 'Static methods are ideal for utility functions that neither access instance state nor class state.',
      },
      {
        question: 'Student.show_school() prints the class attribute school without needing an instance. This should be:',
        options: [
          '@classmethod accessing cls.school',
          '@staticmethod with no parameters',
          'Instance method requiring a Student object',
          'A global function outside the class',
        ],
        correctIndex: 0,
        explanation: '@classmethod with cls accesses class-level attributes and can be called on the class directly.',
      },
    ],
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Composition, design patterns, file handling, generics, decorators, and callbacks.',
    duration: '28 min',
    slides: [
      {
        title: 'Composition vs Inheritance',
        content: `**Inheritance (IS-A):** "A Dog is an Animal" — use when there's a true hierarchical relationship.

**Composition (HAS-A):** "A Car has an Engine" — use when you want flexibility and loose coupling.

From Lecture 10: In most real systems, **composition is safer and more flexible** than inheritance by default.`,
        code: `class Engine:
    def start(self):
        print("Engine starts")

class ElectricEngine:
    def start(self):
        print("Electric engine starts silently")

class Car:
    def __init__(self, engine):
        self.engine = engine  # Composition

    def start(self):
        self.engine.start()

car1 = Car(Engine())
car2 = Car(ElectricEngine())
car1.start()  # Engine starts
car2.start()  # Electric engine starts silently`,
      },
      {
        title: 'Design Patterns Overview',
        content: `**Design patterns** are reusable solutions to common software design problems.

Three categories:
- **Creational** — Object creation (Factory, Singleton)
- **Structural** — Class/object structure
- **Behavioral** — Object interaction (Strategy)

From Lecture 10: Factory, Singleton, and Strategy are essential patterns for flexible OOP design.`,
        code: `# Strategy Pattern — select behavior at runtime
class CreditCard:
    def pay(self, amount):
        print(f"Paid with Credit Card: {amount}")

class PayPal:
    def pay(self, amount):
        print(f"Paid with PayPal: {amount}")

class ShoppingCart:
    def __init__(self, payment_method):
        self.payment_method = payment_method

    def checkout(self, amount):
        self.payment_method.pay(amount)

cart = ShoppingCart(CreditCard())
cart.checkout(500)`,
      },
      {
        title: 'File Handling in OOP',
        content: `From Lecture 11: File handling stores data permanently. In OOP, classes manage their own persistence.

**Text files** — Human-readable (.txt, .csv)
**Binary files** — Machine-readable (.dat, .bin)

Key modes: r (read), w (write), a (append), rb/wb (binary)

Always prefer \`with open()\` for automatic file closing.`,
        code: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def save_data(self):
        with open("students.txt", "a") as file:
            file.write(f"{self.name} {self.marks}\\n")

    @classmethod
    def load_all(cls):
        students = []
        with open("students.txt", "r") as file:
            for line in file:
                name, marks = line.strip().split()
                students.append(cls(name, int(marks)))
        return students`,
      },
      {
        title: 'JSON & Pickle Serialization',
        content: `**JSON** — Human-readable, great for APIs and config files. Use json.dumps/loads and __dict__.

**Pickle** — Binary serialization for complete Python objects. Use pickle.dump/load with wb/rb modes.

From Lecture 11: Pickle stores full objects; JSON stores readable dictionaries.`,
        code: `import json
import pickle

class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

# JSON serialization
e1 = Employee("Ahmed", 50000)
with open("employee.json", "w") as f:
    json.dump(e1.__dict__, f)

# Pickle serialization
with open("employee.dat", "wb") as f:
    pickle.dump(e1, f)`,
      },
      {
        title: 'Generics, Decorators & Callbacks',
        content: `**Type hints & generics** (Lecture 14): Use typing module for clearer, safer code.

**Decorators**: Functions that modify other functions — @staticmethod, @classmethod, @property, and custom decorators.

**Callbacks** (Lecture 16): Functions passed as arguments, executed when events occur. Foundation of event-driven programming and GUIs.`,
        code: `from typing import TypeVar, Generic, Optional

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, value: T):
        self.value = value

    def get_value(self) -> T:
        return self.value

# Callback example
class Assignment:
    def submit(self, callback):
        print("Processing submission...")
        callback()

def on_success():
    print("Assignment submitted!")

a = Assignment()
a.submit(on_success)`,
      },
    ],
    questions: [
      {
        question: 'A Car class needs to support both gas and electric engines without changing Car itself. Which design is BEST?',
        options: [
          'Composition — Car has an Engine passed in at construction',
          'Inheritance — ElectricCar and GasCar both inherit everything',
          'Global variable for engine type',
          'Copy Engine code into Car class',
        ],
        correctIndex: 0,
        explanation: 'Composition (HAS-A) lets you swap engine behavior at runtime without rigid inheritance hierarchies.',
      },
      {
        question: 'You need to save a Python object with all attributes for later loading. Which approach preserves the complete object?',
        options: [
          'pickle.dump() to a binary file',
          'print() the object to a text file',
          'Store only the class name as a string',
          'JSON without __dict__',
        ],
        correctIndex: 0,
        explanation: 'Pickle serializes complete Python objects to binary. JSON only stores dictionary representations.',
      },
      {
        question: 'A GUI button calls button_clicked() when clicked. button_clicked is passed as the command parameter. This is:',
        options: [
          'A callback — function executed when an event occurs',
          'A static method — no instance needed',
          'An abstract method — must be overridden',
          'A metaclass — defines class behavior',
        ],
        correctIndex: 0,
        explanation: 'Callbacks are functions/methods passed as arguments and invoked later when events trigger them.',
      },
    ],
  },
];

// Merge metadata with content for convenience
lessons.forEach((meta, i) => {
  const content = lessonContent[i];
  if (content) {
    Object.assign(lessons[i], {
      slides: content.slides,
      questions: content.questions,
    });
  }
});

export function getLessonById(id) {
  return lessonContent.find((l) => l.id === id);
}

export function getLessonIndex(id) {
  return lessonContent.findIndex((l) => l.id === id);
}

export function getAllLessons() {
  return lessonContent;
}
