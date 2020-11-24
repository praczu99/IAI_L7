let preQuestions;

   fetch('https://quiztai.herokuapp.com/api/quiz')
            	.then(resp => resp.json())
            	.then(resp => {
                	 preQuestions = resp;
                     let next = document.querySelector('.next');
                     let previous = document.querySelector('.previous');
                     let currentQuestion = document.querySelector('.current-question');
                     let questions = document.querySelector('.questions');


                     let question = document.querySelector('.question');
                     let answers = document.querySelectorAll('.list-group-item');

                     let pointsElem = document.querySelector('.score');
                     let restart = document.querySelector('.restart');
                     let index = 0;
                     let points = 0;

                     function setQuestion(index) {
                     console.log('index', index);
                        clearClass();
                        question.innerHTML = preQuestions[index].question;

                          if (preQuestions[index].answers.length === 2) {
                               answers[2].style.display = 'none';
                               answers[3].style.display = 'none';
                           } else {
                               answers[2].style.display = 'block';
                               answers[3].style.display = 'block';
                           }

                        answers[0].innerHTML = preQuestions[index].answers[0];
                        answers[1].innerHTML = preQuestions[index].answers[1];
                        answers[2].innerHTML = preQuestions[index].answers[2];
                        answers[3].innerHTML = preQuestions[index].answers[3];

                        currentQuestion.innerText = index +1;
                        activateAnswers();

                     }
                     questions.innerText = preQuestions.length;

                     setQuestion(index);

                     function clearClass (){
                     for (let i = 0; i < answers.length; i++){
                     answers[i].classList.remove('correct');
                     answers[i].classList.remove('incorrect');

                     }

                     }

                     next.addEventListener('click', function () {
                        if (index !== preQuestions.length - 1){
                        index++;
                        setQuestion(index);
                        }

                        if (index + 1 === preQuestions.length){
                         localStorage.setItem("wynik", points)

                        }

                     });

                     previous.addEventListener('click', function () {
                       if (index !==0){
                        index--;
                        setQuestion(index);
                        }

                     });
                     function activateAnswers() {
                        for (let i = 0; i < answers.length; i++) {
                           answers[i].addEventListener('click', doAction);
                        }
                     }

                     function disableAnswers() {
                        for (let i = 0; i < answers.length; i++) {
                           answers[i].removeEventListener('click', doAction);
                        }
                     }
                     function markCorrect(elem) {
                        elem.classList.add('correct');
                     }
                     function markInCorrect(elem) {
                        elem.classList.add('incorrect');
                     }



                     function doAction(event) {
                         console.log('event', event);
                         //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
                         if (event.target.innerHTML === preQuestions[index].correct_answer) {
                             points++;
                             pointsElem.innerText = points;
                             markCorrect(event.target);
                         }
                         else {
                             markInCorrect(event.target);
                         }
                         disableAnswers();
                     }
                     function activateAnswers() {
                        for (let i = 0; i < answers.length; i++) {
                           answers[i].addEventListener('click', doAction);
                        }
                     }
                     activateAnswers();



                     restart.addEventListener('click', function (event) {
                         event.preventDefault();

                         index = 0;
                         points = 0;
                         let userScorePoint = document.querySelector('.score');
                                 userScorePoint.innerHTML = points;
                                 //setQuestion(index);
                                 //activateAnswers();
                                 //list.style.display = 'block';
                                //results.style.display = 'none';
                     });

            	});

