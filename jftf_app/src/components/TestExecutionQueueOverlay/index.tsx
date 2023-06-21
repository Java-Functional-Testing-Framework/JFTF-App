import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import {Theme} from '@mui/material/styles';
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';
import {
    getTestApplicationExecutionTaskStatus
} from "../../utils/api/get-test-application-execution-task-status-async.tsx";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

const Overlay = styled('div')(({theme}) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    zIndex: 9999,
    transition: 'transform 0.3s ease',
    transform: 'translateY(0)',
    '&.hidden': {
        transform: 'translateY(100%)',
    },
}));

const TaskBox = styled('div')(({theme}) => ({
    display: 'inline-block',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    cursor: 'pointer',
}));

const Tag = styled('span')(({theme}) => ({
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    padding: '4px',
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    borderRadius: '4px',
}));

const FailureTag = styled(Tag)(({theme}) => ({
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.light,
}));

const SuccessTag = styled(Tag)(({theme}) => ({
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.light,
}));

const ToggleButton = styled(Fab)(({theme}) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    zIndex: 10000,
}));

export interface Task {
    id: string;
    name: string;
}

let taskQueue: Task[] = JSON.parse(localStorage.getItem('taskQueue') || '[]');
let setTaskQueue: React.Dispatch<React.SetStateAction<Task[]>> = () => {
};

export const enqueueTask = (taskId: string, taskName: string) => {
    setTaskQueue((prevQueue) => [...prevQueue, {id: taskId, name: taskName}]);
};

export const dequeueTask = (taskId: string) => {
    setTaskQueue((prevQueue) => prevQueue.filter((task) => task.id !== taskId));
};

interface TaskQueueOverlayProps {
    theme: Theme;
}

const TaskQueueOverlay: React.FC<TaskQueueOverlayProps> = ({theme}) => {
    const [localTaskQueue, setLocalTaskQueue] = useState<Task[]>(taskQueue);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [taskStatusTags, setTaskStatusTags] = useState<Record<string, React.ReactNode>>({});
    const navigate = useNavigate();

    useEffect(() => {
        taskQueue = localTaskQueue;
        setTaskQueue = setLocalTaskQueue;
        localStorage.setItem('taskQueue', JSON.stringify(localTaskQueue));
    }, [localTaskQueue]);

    useEffect(() => {
        const checkTaskStatus = async () => {
            for (const task of localTaskQueue) {
                const taskStatus = (await getTestApplicationExecutionTaskStatus(task.id)).status;

                if (taskStatus === 'SUCCESS') {
                    dequeueTask(task.id);

                    const testNames = task.name.split(','); // Split the task names by comma (for multiple test application execution)

                    if (testNames.length > 1) {
                        toast.success(`Multiple test application execution task '${task.name}' (${task.id}) completed successfully.`);
                    } else {
                        toast.success(`Test application execution task '${task.name}' (${task.id}) completed successfully.`);
                    }
                } else if (taskStatus === 'FAILURE') {
                    dequeueTask(task.id);

                    const testNames = task.name.split(','); // Split the task names by comma (for multiple test application execution)

                    if (testNames.length > 1) {
                        const errorMessage = `Multiple test application execution task '${task.name}' (${task.id}) failed.`;
                        toast.error(errorMessage);
                    } else {
                        const errorMessage = `Test application execution task '${task.name}' (${task.id}) failed.`;
                        toast.error(errorMessage);
                    }
                }
            }
        };

        const intervalId = setInterval(checkTaskStatus, 1000); // Polling interval of 1 second

        return () => {
            clearInterval(intervalId);
        };
    }, [localTaskQueue]);

    const handleToggleOverlay = () => {
        setIsOverlayVisible((prevState) => !prevState);
    };

    const handleTaskBoxClick = async (taskId: string) => {
        const id = (await getTestApplicationExecutionTaskStatus(taskId)).id;
        navigate(`/test-case-result-admin/${id}/show`);
    };

    const getTaskStatusTag = async (taskId: string) => {
        const taskStatus = (await getTestApplicationExecutionTaskStatus(taskId)).status;
        if (taskStatus === 'PENDING') {
            return <Tag>In progress</Tag>;
        }
        if (taskStatus === 'FAILURE') {
            return <FailureTag>Failed</FailureTag>;
        }
        if (taskStatus === 'SUCCESS') {
            return <SuccessTag>Success</SuccessTag>;
        }
        return null;
    };


    useEffect(() => {
        const updateTaskStatusTags = async () => {
            const tags: Record<string, React.ReactNode> = {};

            for (const task of localTaskQueue) {
                const taskStatusTag = await getTaskStatusTag(task.id);
                tags[task.id] = taskStatusTag;
            }

            setTaskStatusTags(tags);
        };

        updateTaskStatusTags();

        const intervalId = setInterval(updateTaskStatusTags, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, [localTaskQueue]);

    if (localTaskQueue.length === 0) {
        return null; // Don't render the overlay if the queue is empty
    }

    return (
        <>
            <Overlay
                theme={theme}
                className={isOverlayVisible ? '' : 'hidden'}
            >
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {localTaskQueue.map((task) => (
                        <TaskBox
                            key={task.id}
                            sx={{
                                backgroundColor: theme.palette.grey[900],
                            }}
                            onClick={() => handleTaskBoxClick(task.id)}
                        >
                            {task.name} ({task.id})
                            {taskStatusTags[task.id]}
                        </TaskBox>
                    ))}
                    {localTaskQueue.length > 0 && <CircularProgress size={24}/>}
                </div>
            </Overlay>
            <ToggleButton
                onClick={handleToggleOverlay}
                sx={{
                    display: localTaskQueue.length > 0 ? 'block' : 'none',
                    zIndex: 10001,
                }}
            >
                {isOverlayVisible ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}
            </ToggleButton>
        </>
    );
};

export default TaskQueueOverlay;
