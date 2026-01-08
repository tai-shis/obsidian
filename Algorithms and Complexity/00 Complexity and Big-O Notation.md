### Complexity
---
$$
\lim_{n \rightarrow \infty}\frac{f(n)}{g(n)} = \left \{ 0, c > 0, \infty \right \} $$
Kinds of complexity
$$
\begin{aligned}
	f(n) \in o(g(n)) \\
	f(n) \in O(g(n)) \\
	f(n) \in \theta(g(n)) \\
	f(n) \in \omega(g(n)) \\
	f(n) \in \Omega(g(n)) \\
\end{aligned}
$$
Example:
$$
\begin{aligned}
	&\leq \Rightarrow  &4n\in O(n^2)\\
	&\lt \Rightarrow&\frac{1}{3}n^3 \notin O(n^2) \\
	&\geq \Rightarrow&n^2 \in \Omega(n) \\
	&\gt \Rightarrow&n^2 \in \omega(n) \\
\end{aligned}
$$
asymptotically leq, or similarly others can be represented with equalities; as in (in limit notation):
$$
\begin{aligned}
\lim_{n \rightarrow \infty}\frac{f(n)}{g(n)} &\lt \infty \iff f(n) \in &O(g(n)) \\
\lim_{n \rightarrow \infty}\frac{f(n)}{g(n)} &= 0 \iff f(n) \in &o (g(n)) \\
& \gt 0 &\Omega \\
& = \infty &\omega \\
& = c &\theta \\
\end{aligned}
$$
