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
int c = 0;

void fill (int tr, int tc, int dr, int dc, int s)
{
    if (s == 1) return;
    c++;
    int half = s / 2;
    // 左上角
    if (dr < tr + half && dc < tc + half) {
        fill(tr, tc, dr, dc, half);
    } else {  // 无特殊位置,标记右下角为特殊位置
        matrix[tr + half - 1][tc + half - 1] = 1;
        fill(tr, tc, tr + half - 1, tc + half - 1, half);
    }
    // 右上角
    if (dr < tr + half && dc >= tc + half) {
        fill(tr, tc + half, dr, dc, half);
    } else {
        matrix[tr + half - 1][tc + half] = 1;
        fill(tr, tc + half, tr + half - 1, tc + half, half);
    }
    // 左下角
    if (dr >= tr + half && dc < tc + half) {
        fill(tr + half, tc, dr, dc, half);
    } else {
        matrix[tr + half][tc + half - 1] = 1;
        fill(tr + half, tc, tr + half, tc + half - 1, half);
    }
    // 右下角
    if (dr >= tr + half && dc >= tc + half) {
        fill(tr + half, tc + half, dr, dc, half);
    } else {
        matrix[tr + half][tc + half] = 1;
        fill(tr + half, tc + half, tr + half, tc + half, half);
    }
}
int main ()
{
    fill(0, 0, 1, 1, size);
    cout<<"使棋盘满了需要："<<c<<"块L型"<<endl;
    return 0;
}