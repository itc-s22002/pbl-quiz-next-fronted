'use client'

import React, {useState, useEffect, Component} from "react";
import {useRouter} from "next/navigation";



//出題画面
const Question = () => {
    //firebaseから取ってきたquizを入れる変数
    const [quiz, setQuiz] = useState(null);
    //firebaseから取ってきたchoiceを入れる配列
    const [choice, setChoise] = useState([]);
    //ランダムで呼び出すやつ
    // const randomNumber = Math.floor(Math.random() * (3 + 1 - 0)) + 0;
    const randomNumber = 1
    //画面遷移に使うやつ
    const router = useRouter();
    


    //firebaseから取ってくる
    const fetchData = async () => {
        //get
        try {
            const quizResponse = await fetch(`http://localhost:5000/quiz/1`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                orderBy: [
                    {createdAt: "desc"}
                ]
            });
            const choiceResponse = await fetch(`http://localhost:5000/choice/1`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                orderBy: [
                    {createdAt: "desc"}
                ],
            });
            const quizData = await quizResponse.json();
            const choiceData = await choiceResponse.json();
            if (quizResponse) {
                const q = quizData
                //const c = choiceData.docs.map(doc=>({ id: doc.id, ...doc.data() }))
                const c = choiceData
                setQuiz(q);
                setChoise(c);
                console.log("question: ",q);
                console.log("choice: ",c);
            } else {
                console.log('Quiz not found');
            }
        } catch (error){
            console.error('Error fetching quiz data: ', error);
        }
    };
    //アクセスと同時にやる関数
    useEffect(() => {
        fetchData();
    }, []);

    return (
      <>
        {quiz ? (
          <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white'
          }}>
            <div style={{
              width: 600,
              maxWidth: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                color: 'black',
                fontSize: quiz.question.length > 150 ? 25 : 35,
                fontFamily: 'Inter',
                fontWeight: '400',
                wordWrap: 'break-word',
                marginBottom: 40,
                textAlign: 'center',
                lineHeight: 1.4
              }}>
                問題:
                <div dangerouslySetInnerHTML={{__html:String(quiz.question)}}/>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 25,
                width: '100%'
              }}>
                {choice.map((c, index) => (
                  <div key={c.id} onClick={() => router.push(`/explanation?choiseid=${c.id}&quizid=${c.quizId}`)} style={{
                    width: '100%',
                    height: 50,
                    background: '#F36D6D',
                    borderRadius: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: 30,
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      textAlign: 'center',
                      padding: '0 10px'
                    }}>
                      {c.choice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    )
}

export default Question