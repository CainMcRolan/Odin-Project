export default class Task {
   constructor(title, description, dueDate, priority, isDone, id) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.isDone = isDone;
      this.id = id;
   }
}