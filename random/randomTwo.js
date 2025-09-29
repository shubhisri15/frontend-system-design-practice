console.log([,,].length) // 2

class Scheduler {
    constructor(limit) {
        this.limit = limit
        this.tasks = []
        this.runningTasks = 0
    }

    add (task, priority) {
        return new Promise((res, rej) => {
            const obj = { task, priority, res, rej }
            let i = this.tasks.findIndex(task => task.priority > priority) 
            if (i === -1) {
                this.tasks.push(obj)
            } else {
                this.tasks.splice(i, 0, obj)
            }

            this.runTask()
        })   
    }

    runTask () {
        if (this.runningTasks >= this.limit || this.tasks.length === 0) return

        const { task, res, rej } = this.tasks.shift()
        this.runningTasks ++

        Promise.resolve().then(task).then(res).catch(rej).finally(() => {
            this.runningTasks --
            this.runTask()
        })

    }
}

const scheduler = new Scheduler(2); // max 2 tasks concurrently

const wait = (time, name) => () => new Promise(res => {
  setTimeout(() => {
    console.log(name, 'done');
    res(name);
  }, time);
});

scheduler.add(wait(300, 'task1'), 2);
scheduler.add(wait(100, 'task2'), 1);
scheduler.add(wait(200, 'task3'), 3);
scheduler.add(wait(150, 'task4'), 2);
