//
//  ViewController.h
//  AOC1 Week 4
//
//  Created by Adam Vinsant on 1/29/13.
//  Copyright (c) 2013 Adam Vinsant. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    UILabel *textLabel;
    UITextField *userName;
    UIButton *login;
    UILabel *instructions;
    UIButton *dateButton;
    UIButton *nameButton;
    UILabel *nameDetail;
    UIAlertView *alertDate;
}

- (void)onClick: (UIButton*)button;

@end
