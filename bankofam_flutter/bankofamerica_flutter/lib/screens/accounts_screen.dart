import 'package:flutter/material.dart';

class AccountsScreen extends StatefulWidget {
  const AccountsScreen({super.key});

  @override
  State<AccountsScreen> createState() => _AccountsScreenState();
}

class _AccountsScreenState extends State<AccountsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          children: [
            SizedBox(
              height: 10,
            ),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                      color: Colors.grey,
                      blurRadius: 3,
                      spreadRadius: 1,
                      offset: Offset(0, 0))
                ],
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Text(
                          'Hello, Estefano',
                          style: TextStyle(
                              color: Colors.blue.shade700,
                              fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                  Container(
                    color: Colors.grey,
                    height: 1,
                  ),
                  Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [Icon(Icons.arrow_circle_up)],
                        ),
                      ),
                      Column(
                        children: [
                          Row(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(top: 8.0),
                                child: Text(
                                  'Bank of America Life Plan',
                                  style: TextStyle(
                                      color: Colors.blue.shade700,
                                      fontWeight: FontWeight.w500),
                                ),
                              ),
                              Text(
                                'hhhhfffh',
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                          Row(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Text(
                                  "Your next steps are ready. Let's go!",
                                  style: TextStyle(
                                      color: Colors.grey.shade600,
                                      fontSize: 11),
                                ),
                              ),
                              Text(
                                'hhhhfh',
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                          SizedBox(
                            height: 5,
                          )
                        ],
                      )
                    ],
                  ),
                  Container(
                    color: Colors.grey,
                    height: 1,
                  ),
                  Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Text(
                          'My Rewards',
                          style: TextStyle(
                              color: Colors.blue.shade700,
                              fontWeight: FontWeight.w400),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 15,
            ),
            //--------------------------------------------------- money----------
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                      color: Colors.grey,
                      blurRadius: 3,
                      spreadRadius: 1,
                      offset: Offset(0, 0))
                ],
              ),
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(10),
                        topRight: Radius.circular(10),
                      ),
                      color: Color.fromARGB(255, 158, 21, 11),
                    ),
                    child: Row(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(
                              left: 14.0, top: 25, bottom: 14),
                          child: Text(
                            'Bank of America',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    color: Colors.grey,
                    height: 1,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                                left: 20.0, top: 10, bottom: 5),
                            child: Text('Adv Plus Banking - 5736'),
                          ),
                          Row(
                            children: [
                              Text(
                                "\$21,012.92",
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 20),
                              ),
                              Text(
                                'ffffffff',
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                          SizedBox(
                            height: 10,
                          )
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(13.0),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(4),
                            color: Colors.grey.shade300,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(6.0),
                            child: Text('VIEW'),
                          ),
                        ),
                      )
                    ],
                  ),
                  Container(
                    color: Colors.grey,
                    height: 1,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                                left: 20.0, top: 10, bottom: 5),
                            child: Text('Savings Account - 0193'),
                          ),
                          Row(
                            children: [
                              Text(
                                "\$850,300.75",
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 20),
                              ),
                              Text(
                                'fff',
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                          SizedBox(
                            height: 10,
                          )
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(13.0),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(4),
                            color: Colors.grey.shade300,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(6.0),
                            child: Text('VIEW'),
                          ),
                        ),
                      )
                    ],
                  ),
                  Container(
                    color: Colors.grey,
                    height: 1,
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Text(
                      'OPEN NEW ACCOUNT',
                      style: TextStyle(
                          color: Colors.blue.shade700,
                          fontWeight: FontWeight.w500),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 15,
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey,
                        blurRadius: 3,
                        spreadRadius: 1,
                        offset: Offset(0, 0))
                  ],
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.white,
                ),
                child: Column(
                  children: [
                    Text('MERRIL EDGE SELF-DIRECTED'),
                    Text('Invest for retirement and get up to \$600'),
                    Row(
                      children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red),
                          onPressed: () {},
                          child: Text('Get Started'),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
            Image.asset('assets/images/inves.png'),
            SizedBox(
              height: 15,
            ),
            Image.asset('assets/images/inves.png'),
            SizedBox(
              height: 15,
            ),
            Image.asset('assets/images/inves.png'),
          ],
        ),
      ),
    ));
  }
}
