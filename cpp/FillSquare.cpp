//
//  FillSquare.cpp
//  PAT Basic Level
//
//  Created by apple on 16/9/14.
//  Copyright © 2016年 zp1996. All rights reserved.
//

#include <iostream>
using namespace std;

const int size = 8;
int matrix[size][size];
int c = 1;

void fill (int tr, int tc, int dr, int dc, int s)
{
    if (s == 1) return;
    c++;
    int half = s / 2;
    // 左上角
    if (dr < tr + half && dc < tc + half) {
        fill(tr, tc, dr, dc, half);
    } else {  // 无特殊位置,标记右下角为特殊位置
        matrix[tr + s - 1][tc + s - 1] = 1;
        fill(tr, tc, tr + s - 1, tc + s - 1, half);
    }
    // 右上角
    if (dr < tr + s && dc >= tc + s) {
        fill(tr, tc + s, dr, dc, half);
    } else {
        matrix[tr + s - 1][tc + s] = 1;
        fill(tr, tc + s, tr + s - 1, tc + s, half);
    }
    // 左下角
    if (dr >= tr + s && dc < tc + s) {
        fill(tr + s, tc, dr, dc, half);
    } else {
        matrix[tr + s][tc + s - 1] = 1;
        fill(tr + s, tc, tr + s, tc + s - 1, half);
    }
    // 右下角
    if (dr >= tr + s && dc >= tc + s) {
        fill(tr + s, tc + s, dr, dc, half);
    } else {
        matrix[tr + s][tc + s] = 1;
        fill(tr + s, tc + s, tr + s, tc + s, half);
    }
}
int main ()
{
    fill(0, 0, 1, 1, size);
    cout<<"使棋盘满了需要："<<c - 1<<"块L型"<<endl;
    return 0;
}
