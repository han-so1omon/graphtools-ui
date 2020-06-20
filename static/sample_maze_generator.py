# https://rosettacode.org/wiki/Maze_generation#Python
from random import shuffle, randrange
 
def make_maze(w = 16, h = 8):
    nodes=[]
    edges=[]
    cnt = 0
    for x in range(h+1):
        for y in range(w+1):
            nodes.append([cnt, y, x, 0])
            cnt += 1

    vis = [[0] * w + [1] for _ in range(h)] + [[1] * (w + 1)]
    ver = [["|  "] * w + ['|'] for _ in range(h)] + [[]]
    hor = [["+--"] * w + ['+'] for _ in range(h + 1)]
    verEdges = [[1] * w + [1] for _ in range(h)] + [[]]
    horEdges = [[1] * w + [1] for _ in range(h + 1)]
    numEdges = [(w+1)*h + w*(h+1)]
 
    def walk(x, y):
        vis[y][x] = 1
 
        d = [(x - 1, y), (x, y + 1), (x + 1, y), (x, y - 1)]
        shuffle(d)
        for (xx, yy) in d:
            if vis[yy][xx]: continue
            if xx == x:
                hor[max(y, yy)][x] = "+  "
                horEdges[max(y, yy)][x] = 0
                numEdges[0] -= 1
            if yy == y:
                ver[y][max(x, xx)] = "   "
                verEdges[y][max(x, xx)] = 0
                numEdges[0] -= 1
            walk(xx, yy)
 

    walk(randrange(w), randrange(h))

    f = open('sample_maze.csv', 'w')


    f.write("%d,%d,%.1f\n" % (len(nodes), numEdges[0], 1.0))
    for n in nodes:
        f.write("%d,%d,%d,%d\n" % (n[0], n[1], n[2], n[3]))

    s = ""
    i = 0
    for (a, b) in zip(horEdges, verEdges):
        j = 0
        for he in a:
            if he == 1:
                if j == len(a)-1:
                    s += ''.join('+')
                else:
                    f.write("%d,%d,%.1f\n" % (i*(w+1)+j,i*(w+1)+j+1,1.0))
                    s += ''.join('+--')
            else:
                s += ''.join('+  ')
            j += 1
        s += ''.join('\n')
        j = 0
        for ve in b:
            if ve == 1:
                s += ''.join('|  ')
                f.write("%d,%d,%.1f\n" % (i*(w+1)+j,(i+1)*(w+1)+j,1.0))
            else:
                s += ''.join('   ')
            j += 1
        s += ''.join('\n')
        i += 1
    return s
    '''
    for e in horEdges:
        f.write("%d,%d,%.1f\n" % (e[0],e[1],e[2]))

    for e in verEdges:
        f.write("%d,%d,%.1f\n" % (e[0],e[1],e[2]))
    '''

    f.close()
 
    '''
    s = ""
    for (a, b) in zip(hor, ver):
        s += ''.join(a + ['\n'] + b + ['\n'])
    return s
    '''
 
if __name__ == '__main__':
    print(make_maze())
