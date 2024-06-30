export default function(target, element, attribute, taskManager) {
   const getClosest = target.closest(element);
   const targetId = getClosest.getAttribute(attribute);
   const tasks = taskManager.getTasks();
   const task = tasks.find(task => task.id == targetId);
   return {
      getClosest,
      targetId,
      tasks,
      task
   }
}