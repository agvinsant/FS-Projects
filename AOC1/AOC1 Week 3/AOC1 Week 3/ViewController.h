//
//  ViewController.h
//  AOC1 Week 3
//
//  Created by Adam Vinsant on 1/23/13.
//  Copyright (c) 2013 Adam Vinsant. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    NSNumber *displaySum;
    NSString *sumString;
    NSString *mutableString;
    NSString *resultsString;
        
    
}
- (NSString*)displayAlertWithString:(NSString*)string;

- (int)add:(NSInteger)num1 num2:(NSInteger)num2;

- (NSString*) numToString:(NSNumber*)additionResult;

- (BOOL)compare:(NSInteger)numA numB:(NSInteger)numB;

- (NSString*)append:(NSString*)string1 string2:(NSString*)string2;


@end
