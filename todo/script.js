/* ==========================
   GLOBAL STATE
========================== */

let totalTasks = 0;
let completedTasks = 0;
let overdueTasks = 0;

const activeTimers = {};

/* ==========================
   APP START
========================== */

$(document).ready(function () {

    startClock();

    initializeBoard();

    updateStats();

    updateColumnCounts();

    $("#addTaskBtn").on("click", addTask);

});

/* ==========================
   LIVE CLOCK
========================== */

function startClock() {

    updateClock();

    setInterval(updateClock, 1000);

}

function updateClock() {

    const now = new Date();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    $("#dayName").text(
        days[now.getDay()]
    );

    $("#liveClock").text(
        now.toLocaleTimeString()
    );

}

/* ==========================
   DRAG & DROP
========================== */

function initializeBoard() {

    $(".drop-area").sortable({

        connectWith: ".drop-area",
        cancel: ".completed-task",
        placeholder: "ui-sortable-placeholder",
        tolerance: "pointer",

        start: function () {

            $(".column")
                .addClass("drag-hover");

        },

        stop: function () {

            $(".column")
                .removeClass("drag-hover");

        },

        receive: function (event, ui) {

            const task = ui.item;

            const targetColumn =
                $(this)
                    .closest(".column")
                    .attr("id");

            handleTaskMovement(
                task,
                targetColumn
            );

        }

    }).disableSelection();

}

/* ==========================
   ADD TASK
========================== */

function addTask() {

    const taskName =
        $("#taskName")
            .val()
            .trim();

    const priority =
        $("#priority")
            .val();

    const deadline =
        $("#deadline")
            .val();

    if (!taskName) {

        alert(
            "Please enter a task name."
        );

        return;
    }

    const uniqueId =
        Date.now();

    const taskId =
        `task_${uniqueId}`;

    const timerId =
        `timer_${uniqueId}`;

    const taskCard = $(`
        <div
            class="task"
            id="${taskId}"
            data-deadline="${deadline}"
            data-completed="false">

            <div class="task-title">
                ${taskName}
            </div>

            <span class="priority ${priority}">
                ${priority.toUpperCase()}
            </span>

            <div class="deadline">
                <i class="fa-regular fa-calendar"></i>
                ${deadline || "No Deadline"}
            </div>

            <div
                class="timer"
                id="${timerId}">

                Waiting...

            </div>

            <div class="task-actions">

                <button
                    class="delete-btn">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>
    `);

    taskCard.hide();

    $("#todo .drop-area")
        .prepend(taskCard);

    taskCard.slideDown(250);

    totalTasks++;

    updateStats();

    updateColumnCounts();

    if (deadline) {

        startTimer(
            deadline,
            timerId,
            taskId
        );

    }

    $("#taskName").val("");

    $("#deadline").val("");

}

/* ==========================
   DELETE TASK
========================== */

$(document).on(
    "click",
    ".delete-btn",
    function () {

        const task =
            $(this)
                .closest(".task");

        const taskId =
            task.attr("id");

        if (
            task.hasClass(
                "completed-task"
            )
        ) {

            completedTasks--;

        }

        if (
            task.hasClass(
                "overdue-task"
            )
        ) {

            overdueTasks--;

        }

        if (
            activeTimers[taskId]
        ) {

            clearInterval(
                activeTimers[taskId]
            );

            delete activeTimers[taskId];

        }

        totalTasks--;

        task.fadeOut(
            200,
            function () {

                $(this).remove();

                updateStats();

                updateColumnCounts();

            }
        );

    }
);

/* ==========================
   COLUMN COUNTS
========================== */

function updateColumnCounts() {

    $(".column").each(function () {

        const taskCount =
            $(this)
                .find(".task")
                .length;

        $(this)
            .find(".task-count")
            .text(taskCount);

        if (taskCount > 0) {

            $(this)
                .find(".empty-message")
                .hide();

        } else {

            $(this)
                .find(".empty-message")
                .show();

        }

    });

}

/* ==========================
   STATISTICS
========================== */

function updateStats() {

    const activeTasks =
        totalTasks -
        completedTasks -
        overdueTasks;

    $("#totalTasks")
        .text(totalTasks);

    $("#completedTasks")
        .text(completedTasks);

    $("#overdueTasks")
        .text(overdueTasks);

    $("#activeTasks")
        .text(activeTasks);

}

/* ==========================
   TASK MOVEMENT
========================== */

function handleTaskMovement(
    task,
    targetColumn
) {

    if (
        targetColumn ===
        "completed"
    ) {

        completeTask(task);

    }

    updateColumnCounts();

    updateStats();

}

/* ==========================
   COUNTDOWN TIMER
========================== */

function startTimer(
    deadline,
    timerId,
    taskId
) {

    const endTime =
        new Date(deadline).getTime();

    activeTimers[taskId] =
        setInterval(function () {

            const now =
                new Date().getTime();

            const distance =
                endTime - now;

            const task =
                $("#" + taskId);

            const timer =
                $("#" + timerId);

            if (!task.length) {

                clearInterval(
                    activeTimers[taskId]
                );

                delete activeTimers[taskId];

                return;
            }

            if (
                task.attr(
                    "data-completed"
                ) === "true"
            ) {

                clearInterval(
                    activeTimers[taskId]
                );

                delete activeTimers[taskId];

                return;
            }

            if (distance <= 0) {

                clearInterval(
                    activeTimers[taskId]
                );

                delete activeTimers[taskId];

                handleExpiredTask(task);

                return;
            }

            const days =
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                );

            const hours =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60 * 24))
                    /
                    (1000 * 60 * 60)
                );

            const minutes =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60))
                    /
                    (1000 * 60)
                );

            const seconds =
                Math.floor(
                    (distance %
                        (1000 * 60))
                    / 1000
                );

            timer.html(`
                <i class="fa-regular fa-clock"></i>
                ${days}d ${hours}h ${minutes}m ${seconds}s
            `);

        }, 1000);

}

/* ==========================
   EXPIRED TASK
========================== */

function handleExpiredTask(task) {

    if (
        task.hasClass(
            "completed-task"
        )
    ) {
        return;
    }

    if (
        task.hasClass(
            "overdue-task"
        )
    ) {
        return;
    }

    task.addClass(
        "overdue-task"
    );

    task.find(".timer")
        .addClass("expired")
        .html(`
            <i class="fa-solid fa-fire"></i>
            Deadline Passed
        `);

    $("#backlog .drop-area")
        .prepend(task);

    overdueTasks++;

    updateStats();

    updateColumnCounts();

}

/* ==========================
   COMPLETE TASK
========================== */

function completeTask(task) {

    if (
        task.attr(
            "data-completed"
        ) === "true"
    ) {
        return;
    }

    task.attr(
        "data-completed",
        "true"
    );

    const taskId =
        task.attr("id");

    if (
        activeTimers[taskId]
    ) {

        clearInterval(
            activeTimers[taskId]
        );

        delete activeTimers[taskId];

    }

    if (
        task.hasClass(
            "overdue-task"
        )
    ) {

        overdueTasks--;

    }

    task.removeClass(
        "overdue-task"
    );

    task.addClass(
        "completed-task"
    );

    task.find(".timer")
        .remove();

    task.append(`
        <div class="completed-badge">
            <i class="fa-solid fa-check"></i>
            Finished
        </div>
    `);
    task.css(
        "cursor",
        "default"
    );

    completedTasks++;

    updateStats();

    updateColumnCounts();

    const taskName =
        task.find(
            ".task-title"
        ).text();

    showSuccessToast(
        taskName
    );

    launchConfetti();

}

/* ==========================
   SUCCESS TOAST
========================== */

function showSuccessToast(
    taskName
) {

    $("#completedTaskName")
        .text(
            `"${taskName}" completed successfully`
        );

    $("#successToast")
        .addClass("show");

    setTimeout(function () {

        $("#successToast")
            .removeClass("show");

    }, 3000);

}

/* ==========================
   CONFETTI
========================== */

function launchConfetti() {

    if (
        typeof confetti ===
        "undefined"
    ) {
        return;
    }

    confetti({
        particleCount: 120,
        spread: 80,
        origin: {
            y: 0.7
        }
    });

    setTimeout(() => {

        confetti({
            particleCount: 80,
            spread: 100,
            origin: {
                y: 0.6
            }
        });

    }, 200);

}

/* ==========================
   ENTER KEY SUPPORT
========================== */

$("#taskName").on(
    "keypress",
    function (e) {

        if (e.which === 13) {

            addTask();

        }

    }
);