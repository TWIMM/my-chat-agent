/* Save Ai  */
const logBtn = document.querySelector('#save_ia_agent');
if (logBtn) {
    logBtn.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const selectedTopicsDisplay = document.getElementById("selected-topics");

        //const topicsArray = selectedTopicsDisplay.textContent.split(",");
        const topics = selectedTopicsDisplay.textContent;

        // Check if fields are empty
        if (!name || !description || !topics) {
            Notiflix.Notify.failure('All fields are required!');
            return;
        }

        // Prepare data
        const requestData = { name, description, topics };

        try {
            // Send the login request
            const response = await fetch('/ai-api/create-ai_agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Handle server response
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    Notiflix.Notify.success('Ai agent created successfully!');
                    // Redirect to dashboard or home
                    window.location.href = '/iaagent';
                } else {
                    Notiflix.Notify.success(result.message || 'Ai agent creation failed!');
                }
            } else {
                Notiflix.Notify.failure('An error occurred during Ai agent creation.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Notiflix.Notify.failure('An error occurred. Please try again.');
        }
    });
}


/* train AI */
const traintrigger = document.querySelector('#widgetselect');

if (traintrigger) {
    traintrigger.addEventListener('change', async () => {
        const response = await fetch('/ai-api/train_ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: traintrigger.value
            })
        });


        if (response.ok) {
            const result = await response.json()
            if (result.success) {
                console.log(result.message);


            }
        }
    });
}



/* Update Ai  */
const updateBtonn = document.querySelector('#update_ia_agent');
if (updateBtonn) {
    updateBtonn.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const selectedTopicsDisplay = document.getElementById("selected-topics");
        const aiId = document.getElementById("aiId").value;

        //const topicsArray = selectedTopicsDisplay.textContent.split(",");
        const topics = selectedTopicsDisplay.textContent;

        // Check if fields are empty
        if (!name || !description || !topics) {
            Notiflix.Notify.failure('All fields are required!');
            return;
        }

        // Prepare data
        const requestData = { name, description, topics, aiId };

        try {
            // Send the login request
            const response = await fetch('/ai-api/update-ai_agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Handle server response
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    Notiflix.Notify.success('Ai agent created successfully!');
                    // Redirect to dashboard or home
                    window.location.href = '/iaagent';
                } else {
                    Notiflix.Notify.success(result.message || 'Ai agent creation failed!');
                }
            } else {
                Notiflix.Notify.failure('An error occurred during Ai agent creation.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Notiflix.Notify.failure('An error occurred. Please try again.');
        }
    });
}



const updateButtonOnBottom = async () => {
    const saveButton = document.getElementById('save_ia_agent');
    const updateButton = document.getElementById('update_ia_agent');

    saveButton.style = "display : none; ";
    updateButton.style = "display : block; ";
}


const editIaAgent = async () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const selectedTopicsDisplay = document.getElementById("selected-topics");

    //const topicsArray = selectedTopicsDisplay.textContent.split(",");
    const topics = selectedTopicsDisplay.textContent;

    // Check if fields are empty
    if (!name || !description || !topics) {
        Notiflix.Notify.failure('All fields are required!');
        return;
    }

    // Prepare data
    const requestData = { name, description, topics };

    try {
        // Send the login request
        const response = await fetch('/ai-api/update-ai_agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Handle server response
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                Notiflix.Notify.success('Ai agent created successfully!');
                // Redirect to dashboard or home
                window.location.href = '/iaagent';
            } else {
                Notiflix.Notify.success(result.message || 'Ai agent update failed!');
            }
        } else {
            Notiflix.Notify.failure('An error occurred during Ai agent update.');
        }
    } catch (error) {
        console.error('Login error:', error);
        Notiflix.Notify.failure('An error occurred. Please try again.');
    }
}


const getSpecificAiAgentDetails = async (aiName) => {
    const response = await fetch('/ai-api/specific_ai_agent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: aiName
        })
    });


    if (response.ok) {
        const result = await response.json()
        if (result.success) {
            const AiAgent = result.AiAgent;
            document.getElementById('name').value = AiAgent?.name;
            document.getElementById('description').value = AiAgent?.description;
            document.getElementById("aiId").value = AiAgent?.aiId;
            const topicsArray = AiAgent?.topics.split(',');
            const options = document.querySelectorAll(".select-option");
            const selectedTopicsDisplay = document.getElementById("selected-topics");
            const selectedTopics = new Set();

            /*  options.forEach((option) => {
 
                 const value = option.dataset.value;
 
                 // Toggle selection
                 if (selectedTopics.has(value)) {
                     selectedTopics.delete(value);
                     option.classList.remove("selected");
                 } else {
                     selectedTopics.add(value);
                     option.classList.add("selected");
                 }
 
                 // Update selected topics display
                 selectedTopicsDisplay.textContent =
                     selectedTopics.size > 0
                         ? `${Array.from(selectedTopics).join(", ")}`
                         : "";
 
             }); */

            //console.log(Array.from(selectedTopics).join(", "));

        }
    }

    //return response.AiAgent;
}


const fillUpdater = async (Name_) => {
    await updateButtonOnBottom();
    const AiAgent = await getSpecificAiAgentDetails(Name_);

}


const retriever = async () => {

    const table = new DataTable('#example', {
        layout: {
            //top1: 'searchPanes',
            paging: true,
            searching: true,
            ordering: true,
            pageLength: 5,
        },

    });

    const response = await fetch('/ai-api/ai_agent', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });



    // Handle server response
    if (response.ok) {
        const result = await response.json();
        if (result.success) {
            Notiflix.Notify.success('Ai agent list retrieved successfully!');
            result.AiAgent.forEach(element => {

                const truncatedAiId = element.aiId.slice(0, 8) + "*****";

                const truncatedAiDesc = element.description.slice(0, 15) + "...";
                const idWithToolTip = `<span title="${element.aiId}">${truncatedAiId}</span>`;

                const actionsButtons = `
                    <button onclick="fillUpdater('${element.name}')" id="but_hover" class="editer"><i class="fas fa-edit"></i></button>
                    <button id="but_hover" class="deleter"><i class="fas fa-trash"></i></button>
                    <button id="but_hover" class="copier"><i class="fas fa-copy"></i></button>
                `;


                table.row.add([
                    element.name,
                    truncatedAiDesc,
                    idWithToolTip,
                    actionsButtons
                ]).draw();
            });

            // Redirect to dashboard or home
            //window.location.href = '/iaagent';
        } else {
            Notiflix.Notify.success(result.message || 'Ai agent creation failed!');
        }
    } else {
        Notiflix.Notify.failure('An error occurred during Ai agent creation.');
    }
}

retriever();



