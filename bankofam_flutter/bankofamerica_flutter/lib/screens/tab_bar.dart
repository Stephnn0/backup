import 'package:bankofamerica_flutter/screens/accounts_screen.dart';
import 'package:flutter/material.dart';

class CustomTabBar extends StatefulWidget {
  const CustomTabBar({super.key});

  @override
  State<CustomTabBar> createState() => _CustomTabBarState();
}

class _CustomTabBarState extends State<CustomTabBar> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        initialIndex: 0,
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            actions: [
              Padding(
                padding: const EdgeInsets.all(4.0),
                child: Image.asset(
                  'assets/images/mess.png',
                  width: 40,
                ),
              ),
            ],
            title: TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                filled: true,
                fillColor: Colors.grey.shade200,
                hintText: 'How can we help?',
                contentPadding:
                    EdgeInsets.symmetric(vertical: 6, horizontal: 20),
                enabledBorder: new OutlineInputBorder(
                  borderRadius: new BorderRadius.circular(10.0),
                  borderSide: BorderSide(color: Colors.grey.shade200),
                ),
                focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(4)),
                    borderSide: BorderSide(width: 1, color: Colors.blue)),
              ),
            ),
            automaticallyImplyLeading: false,
            backgroundColor: Colors.white,
            bottom: TabBar(
                labelColor: Colors.red,
                unselectedLabelColor: Colors.grey.shade800,
                unselectedLabelStyle: TextStyle(color: Colors.grey),
                indicatorColor: Colors.red,
                tabs: <Widget>[
                  Tab(
                    child: Text(
                      'ACCOUNTS',
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  Tab(
                    child: Text(
                      'DASHBOARD',
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                ]),
          ),
          body: const TabBarView(children: [
            AccountsScreen(),
            Center(
              child: Text('hel'),
            )
          ]),
        ));
  }
}
