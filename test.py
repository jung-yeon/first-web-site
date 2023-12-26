the_world_is_flat = True
if the_world_is_flat:
    handLst=[]


    N,K = map(int, input().split())
    isLeft = [False for i in range(N)]
    isRight = [False for i in range(N)]
    for i in range(N):
            leftright = list(map(int, input().split()))
            handLst.append(leftright)
    cnt = N
    if N == 3:
        print(0)
    else:
        isLeft[K-1] = True
            # isLeft[left-1] = True
            # isRight[right-1] = True
        

            if i == 0:
                sulle = K-1
            else: 
                sulle = handLst[sulle][0]
                for i in range(N):
                    for j in range(2):
                        if handLst[sulle][j] == 0:
                            pass
                        else:
                    
        for i in range(N):
            if i == 0:
                sulle = handLst[K-1]
            else: 
                sulle = handLst[sulle-1]
            
            isLeft[sulle-1] = True
        for i in isLeft:
            if i:
                cnt-=1
        print(cnt)

