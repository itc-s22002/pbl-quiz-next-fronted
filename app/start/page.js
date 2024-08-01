'use client'
import { useRouter } from 'next/navigation';

//スタート画面
const Start = () => {
    const router = useRouter();
    return (
        <div style={{width: 498, height: 275, position: 'relative', background: 'white'}}>
            <div style={{width: 132, height: 67, left: 77, top: 87, position: 'absolute', color: '#050505', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>
                Teston
            </div>
            <div style={{width: 150, height: 45, left: 272, top: 143, position: 'absolute', background: '#E77878', borderRadius: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div onClick={() => router.push('/question')} style={{alignSelf: 'stretch', padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div style={{textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>
                        start
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Start
