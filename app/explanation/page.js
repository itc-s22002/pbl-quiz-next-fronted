'use client'

import React, {useState, useEffect} from "react";
import {useRouter} from 'next/navigation';
import { useSearchParams } from "next/navigation";



//解説画面
const Explanation = () => {
    //画面遷移するときのやつ
    const router = useRouter();
    //uqeryデータを取得するやつ
    const searchParams = useSearchParams()
    //取ってきたquizを入れるやつ
    const [quiz, setQuiz] = useState(null);
    //取ってきた統計を取るやつ
    const [statistics, setStatistics] = useState(null);
    //uqeryデータを取得するやつ
    const quizId = searchParams.get('quizid')
    //uqeryデータを取得するやつ
    const choiceId = searchParams.get('choiseid')

    //firebaseをからデータを取得
    const fetchData = async () => {
        //get
        try {
            const quizResponse = await fetch(`http://localhost:5000/quiz/${quizId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                orderBy: [
                    {createdAt: "desc"}
                ]
            });
            const choiceResponse = await fetch(`http://localhost:5000/statistics/${choiceId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                orderBy: [
                    {createdAt: "desc"}
                ],
            });
            const quizData = await quizResponse.json();
            const statisticsData = await choiceResponse.json();
            setQuiz(quizData);
            setStatistics(statisticsData);
            if (quizResponse.ok) {
                const q = quizData
                const s = statisticsData
                //put
               try {
                    const statisticsResponse = await fetch(`http://localhost:5000/statistics/update/${choiceId}`,{
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            choiceResponses:s[0].choiceResponses+1,
                            // choiceResponses:0
                        }),

                    });
                } catch (error) {
                    console.
                    error('Error adding document: ', error);
                }
                try {
                    const quizsResponse = await fetch(`http://localhost:5000/quiz/update/${quizId}`,{
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            totalReaoinses:q.totalResponses+1,
                            // totalReaoinses:0
                        }),

                    })
                } catch (error) {
                    console.
                    error('Error adding document: ', error);
                }
                console.log("question: ",q.totalResponses+1);
                console.log("statistics: ",s[0].choiceResponses+1);
            } else {
                console.log('Quiz not found');
            }
        } catch (error){
            console.error('Error fetching quiz data: ', error);
        }
    };
    //アクセスと同時にやるやつ
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
              width: 800,
              maxWidth: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20
            }}>
              <div style={{
                color: 'black',
                fontSize: quiz.description.length > 200 ? 16 : 22,
                fontFamily: 'Inter',
                fontWeight: '400',
                marginBottom: 30,
                textAlign: 'left',
                width: '100%'
              }}>
                解説:
                <p style={{marginTop: 10}} dangerouslySetInnerHTML={{__html:String(quiz.description)}}/>
              </div>
              <div style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'Inter',
                fontWeight: '400',
                marginBottom: 30,
                textAlign: 'center',
                width: '100%'
              }}>
                <p>total: {quiz.totalResponses + 1}</p>
                <p>choice: {statistics[0].choiceResponses + 1}</p>
                <p>{Math.floor((statistics[0].choiceResponses + 1) / (quiz.totalResponses + 1) * 100)}%</p>
              </div>
              <div style={{
                width: 150,
                height: 40,
                background: '#F36D6D',
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }} onClick={() => router.push('/question')}>
                <div style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Inter',
                  fontWeight: '400'
                }}>
                  next
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </>
    );
    }

export default Explanation